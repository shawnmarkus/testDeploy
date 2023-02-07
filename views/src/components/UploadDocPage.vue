<script>
import axios from "axios";
export default {
  data() {
    return {
      file: "",
      feesAmount: 0,
      fileNameYouSelected: "",
    };
  },

  methods: {
    async submitFile() {
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("feesAmount", this.feesAmount);
      let response = null;
      try {
        response = await axios.put(
          "https://backendfyndcapstoneproject-shawnmarkus.onrender.com/student/uploadDoc",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            crossDomian: true,
          }
        );
        if (response) {
          console.log("FILE UPLOADED SUCCESSFULLY");
          this.$router.push("/");
        } else {
          console.log("FAILED TO UPLOADED");
        }
      } catch (err) {
        console.log(err);
      }
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.fileNameYouSelected = event.target.files[0].name;
    },
  },
};
</script>

<template>
  <div class="masterConatinerOfUploadPage">
    <div class="uploadSectionContainer left">
      <div class="container">
        <label class="selectFile">
          select file
          <input
            type="file"
            required
            id="file"
            v-on:change="handleFileUpload"
          />
        </label>
        <p>{{ fileNameYouSelected }}</p>
        <label>
          <b>feesAmount</b>
          <input type="number" required v-model="feesAmount" />
        </label>

        <!-- <h2>{{ feesAmount }}</h2> -->

        <v-btn class="btn" color="green" v-on:click="submitFile()"
          >Submit</v-btn
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.masterConatinerOfUploadPage {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 1rem;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 15px #ffffff; */
  padding: 2.5rem;
}

label {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  background-color: rgba(206, 206, 206, 0.46);
  padding: 0.7rem 0.75rem;
  border-radius: 5px 5px 0 0;
  border-bottom: 0.7px solid black;
  outline: 0;
}

input[type="file"] {
  display: none;
}

.selectFile {
  color: white;
  background-color: black;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

p {
  margin: 1em 0;
}

.btn {
  margin-top: 1.5rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.left form,
input {
  width: 100%;
}

.right {
  width: 70%;
  padding: 1.25rem;
}

/* .btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 0.25rem 1rem;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
} */

::-webkit-scrollbar {
  width: 0.4em;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #797979c0;
}
/* .uploadSectionContainer {
  padding: 2rem;
} */
</style>
