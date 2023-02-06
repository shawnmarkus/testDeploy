<script>
import HomePage from "../components/HomePage.vue";
import UploadDocPage from "../components/UploadDocPage.vue";
import PreviewOfPrevDoc from "../components/PreviewOfPrevDoc.vue";

// add some thing which can fetch the data before it loads

import { reactive, defineComponent, onBeforeMount, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const data = reactive({
      detail: {},
      error: "",
      feesDetail: {},
      submittedFees: 0,
    });

    onBeforeMount(async () => {
      // console.log("pehle aaya ");
      let response = await axios
        .get(
          "https://backendfyndcapstoneproject-shawnmarkus.onrender.com/student",
          {
            withCredentials: true,
            crossDomain: true,
          }
        )

        .catch((error) => {
          if (error.response.data.msg) {
            console.log(error.response.data.msg);
            data.error = error.response.data.msg;
          }
          data.error = error;
        });

      if (response) {
        // .then((resp) => {
        data.detail = Object(response.data.userDetail);
        data.feesDetail = Object(response.data.feesDataOfStd);
        // data.submittedFees = Object(
        //   response.data.userDetail.feesDetail.feesSubmittedDoc
        // );

        for (let i of response.data.userDetail.feesDetail.feesSubmittedDoc) {
          if (i.status === "verified") {
            data.submittedFees += i.feesAmount;
          }
          // console.log(i);
        }
        // for()
        // console.log("see what is the responce", resp.data);
        // console.log("see what is the responce", data.feesDetail);
        // })
      }
    });

    const print = () => {
      console.log(data.submittedFees);
    };

    // onMounted(() => {
    //   console.log("pura hone ke baad aaya hu", typeof data.detail);
    // });

    return { data, print };
  },

  components: {
    HomePage,
    UploadDocPage,
    PreviewOfPrevDoc,
  },
});
</script>

<template>
  <main>
    <div class="enclosingContainer">
      <div class="detailPart centerTheContent">
        <HomePage :userData="data.detail" />
      </div>
      <div class="uploadPart centerTheContent gridForPartition">
        <UploadDocPage />
        <div class="feesSection">
          <h3 class="title"><b>fees data</b></h3>

          <hr class="horizontalPad" />

          <div v-for="(item, index) in data.feesDetail" :key="index">
            <b> year {{ index }} fees : </b> {{ item }}
          </div>
          <hr class="horizontalPad" />
          <div>
            <b> Amount You Submitted : </b> {{ data.submittedFees }}
            <!-- <v-btn @click="print">click me</v-btn> -->
          </div>
        </div>
      </div>
      <div class="previewOfDoc centerTheContent">
        <PreviewOfPrevDoc :userDataToRndr="data.detail" />
      </div>

      <!-- <div>{{ JSON.stringify(data.detail) }}</div> -->
    </div>
  </main>
</template>

<style scoped>
.feesSection {
  width: 90%;
  height: 90%;
  box-shadow: inset 0 0 10px 10px rgba(156, 156, 156, 0.685);
  border-radius: 10px;
  padding: 1rem;
  overflow-y: auto;
}
.horizontalPad {
  margin: 0.5rem 0;
}

main {
  width: 100vw;
  height: calc(100vh - 4.5rem);
  background-color: aliceblue;
  color: black;
  padding: 2.5rem;
}

.centerTheContent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.detailPart {
  grid-area: detailPart;
}

.uploadPart {
  grid-area: uploadPart;
  border-radius: 1.25rem;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 15px #ffffff;
  width: 100%;
  height: 100%;
}

.previewOfDoc {
  grid-area: previewOfDoc;
}

.enclosingContainer {
  width: 100%;
  height: 100%;
  /* display: flex;
  flex-direction: column;
  place-items: center;
  place-content: center; */

  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "detailPart previewOfDoc"
    "uploadPart previewOfDoc";
}

.gridForPartition {
  display: grid;
  grid-template-columns: 40% 60%;
  justify-items: center;
  width: 95%;
  height: 95%;
  grid-gap: 0.5rem;
  justify-self: center;
  margin-top: 1.25rem;
}

::-webkit-scrollbar {
  width: 0.4em;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #797979c0;
}
</style>
