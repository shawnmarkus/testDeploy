/*
this file contain all the crud related operation

*/

const userModel = require("../model/userModel");
const feesModel = require("../model/feesModel");
const pendingQueue = require("../model/pendingQueue");
const cloudinary = require("../utility/cloudinary");

/* operation of admin */
// upload fees

/*
 * the req body for fees must be as shown
 * {currentSession,feesType,feesdata } where feesdata will be object
 * as feesdata={1:8989,2:89889,3:899898;4:89898}
 */
const feesUpload = async (req, res) => {
  if (req.userState.userRole !== "admin") {
    return res.status(404).json({
      msg: "unauthorized to access",
    });
  }

  console.log(req.body);
  const { currentSession, feesType, feesdata } = req.body;

  // for creating a index
  // throwing query
  await feesModel
    .create({
      currentSession,
      feesType,
      feesdata,
    })
    .then((doc) => {
      return res.status(200).json({
        msg: "document is successfully uploaded",
        status: "SUCCESS",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "failed on server side",
        status: "FAILED",
        err,
      });
    });
};

/*
 * Now to verify the doc a unique singal is passed along with id
 * from body corresponding to the student
 * format:
 * {
 *    id:------- of the student in DB---------,
 *    singal: ["failed","verified"],
 *    fileHashName or docId whatever you use just remember what you used
 * }
 */

// verify fees
const verifyDoc = async (req, res) => {
  if (req.userState.userRole !== "admin") {
    return res.status(404).json({
      msg: "unauthorized",
      status: "FAILED",
    });
  }

  await userModel
    .findOneAndUpdate(
      {
        $and: [
          {
            _id: req.body.id,
          },
          {
            "feesDetail.feesSubmittedDoc._id": req.body.docId,
          },
        ],
      },
      {
        $set: {
          "feesDetail.feesSubmittedDoc.$.status": req.body.signal,
        },
      },
      {
        new: true,
      }
    )
    .then((data) => {
      return res.json({
        data: data,
        msg: "mila hai specific file ",
        status: "SUCCESS",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        err,
        status: "FAILED",
      });
    });
};

// view pending request
const viewRequest = async (req, res) => {
  if (req.userState.userRole !== "admin") {
    return res.status(404).json({
      msg: "unauthorized",
      status: "FAILED",
    });
  }
  const queueList = await pendingQueue.find({}).populate("pendingRequestQueue");
  if (!queueList) {
    return res.status(500).json({
      msg: "no data is found",
      status: "FAILED",
    });
  }

  return res.status(200).json({
    data: queueList,
    msg: "data retrieval is done",
    status: "SUCCESS",
  });
};

/* operation of student*/
// upload doc
const uploadDoc = async (req, res) => {
  /* upload doc event will trigger two event
   * 1. upload the doc to student db
   * 2. add the id of student in queue of request list
   * 3. this function search the doc based on the _id been received
   * 4. the req.body must contain the semester fees
   *
   */
  try {
    // --------- retrive the semester total fees to update the totalfees feild -----------

    // since the result contain  the uri and that need to be updated in Doc_url
    // on 29 JAN using cloudinary

    const result = await cloudinary.uploader.upload(req.file.path);

    if (!result) {
      console.log("failed to load on cloudinary");
      return res.status(500).json({
        result,
        msg: "file upload to cloudinary failed",
      });
    }

    // and we are successfully setting the image url in response

    const uploadedResult = await userModel.findOneAndUpdate(
      { _id: req.userState._id },
      {
        $push: {
          "feesDetail.feesSubmittedDoc": {
            $each: [
              { feesAmount: req.body.feesAmount, doc_url: result.secure_url },
            ],
          },
        },
      },

      {
        new: true,
      }
    );

    if (!uploadedResult) {
      return res.status(500).json({
        status: "failed to upload file",
      });
    }

    const id = req.userState._id;

    await pendingQueue
      .findOneAndUpdate(
        {},
        { $addToSet: { pendingRequestQueue: id } },
        { upsert: true, returnOriginal: false }
      )
      .then((data) => {
        console.log(`data in pending Queue is ===> ${JSON.stringify(data)}`);
        return res.status(200).json({
          dataofUploadedDoc: uploadedResult,
          dataOfQueue: data,
          resultOfCloudinary: result,
          msg: "SUCCESS",
        });
      })
      .catch((err) => {
        console.log(`error occured, but tried well :: ${err}`);
        return res.status(500).json({
          dataofUploadedDoc: uploadedResult,
          dataOfQueue: data,
          errmsg: `try in right way :: ${err}`,
        });
      });
  } catch (error) {
    console.log("executing the error segment");
    return res.json({
      status:
        "FAILED TO ACCOMPLISH TASK EITHER TO UPLOAD OR UPDATE THE PENDING DATA SET",
      error: `error has been thrown ${error}`,
    });
  }
};

// update info
const updateDetails = async (req, res) => {
  const { contactNumber, address } = req.body;
  const { _id } = req.userState._id;

  const userExist = await userModel.findOneAndUpdate(
    { _id },
    {
      $set: {
        contactNumber,
        address,
      },
    },
    {
      new: true,
    }
  );

  if (!userExist) {
    return res.status(530).json({
      msg: "the corresponding request to update in failed",
    });
  }

  return res.status(200).json({
    msg: "successfully updated",
  });
};

/*
 * this below function will take a id of student ,as inside body, id must be there
 * the verify token also have the userRole
 * from from end when viewing a student detail and marking done
 * the request to remove the corresponding id will be triggered
 */

function removeStdFromQueue(req, res) {
  pendingQueue
    .findOneAndUpdate(
      {},
      { $pull: { pendingRequestQueue: req.body.id } },
      {
        new: true,
      }
    )
    .then((data) => {
      console.log(`removed launda ${data}`);
      return res.status(200).json({
        msg: `the corresponding removed`,
        data,
      });
    })
    .catch((err) => {
      console.log(`nhi remove kr paya`);
      return res.status(200).json({
        msg: `failed to remove the corresponding id = ${req.body.id}`,
        err,
      });
    });
}

/*
 * get student after login
 * we will use the cookies and header which contain the info like batch , userRole, _id
 * and we will first get the list of total fees for a student and then push there id to
 * student doc and then send the data after populating it
 */
async function getStudentData(req, res) {
  // get the user detail
  console.log("get the student data");
  const userDetail = await userModel.findOne({ _id: req.userState._id });

  if (userDetail) {
    const batch = parseInt(userDetail.batch);

    const admYear1 = `${batch}-${batch + 1}`;
    const admYear2 = `${batch + 1}-${batch + 2}`;
    const admYear3 = `${batch + 2}-${batch + 3}`;
    const admYear4 = `${batch + 3}-${batch + 4}`;

    console.log(admYear1, admYear2, admYear3, admYear4);
    const feelist = await feesModel.find({
      currentSession: { $in: [admYear1, admYear2, admYear3, admYear4] },
    });

    if (feelist) {
      console.log(` list of fees ${feelist}`);
    }

    const extractExactFeeList = feelist.filter((obj) => {
      return (
        obj.feesType === "extra" || obj.feesType === userDetail.studentType
      );
    });

    // now parse through each data and then check on basis of students batch and add to object to return
    let feesDataOfStd = {};

    extractExactFeeList.forEach((doc) => {
      console.log(doc);
      if (doc.currentSession === admYear4) {
        feesDataOfStd["4"] = doc.feesdata["4"];
      } else if (doc.currentSession === admYear3) {
        feesDataOfStd["3"] = doc.feesdata["3"];
      } else if (doc.currentSession === admYear2) {
        feesDataOfStd["2"] = doc.feesdata["2"];
      } else if (doc.currentSession === admYear1) {
        feesDataOfStd["1"] = doc.feesdata["1"];
      }
    });

    // returned the feeData and user
    return res.status(200).json({
      feesDataOfStd,
      userDetail,
      msg: "fetched the student fees",
    });
  }
}

module.exports = {
  uploadDoc,
  updateDetails,
  feesUpload,
  verifyDoc,
  viewRequest,
  removeStdFromQueue,
  getStudentData,
};
