<script>
import axios from "axios";
export default {
  data() {
    return {
      file: "",
    };
  },

  methods: {
    async submitFile() {
      let formData = new FormData();

      formData.append("image", this.file);
      let response = null;
      try {
        response = await axios.put(
          "http://localhost:5001/student/uploadDoc",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            crossDomian: true,
          }
        );

        if (response.data.status === 200) {
          console.log("FILE UPLOADED SUCCESSFULLY");
        } else {
          console.log("FAILED TO UPLOADED");
        }
      } catch (err) {
        console.log(err);
      }
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
  },
};
</script>

<template>
  <div class="masterConatinerOfUploadPage">
    <div class="uploadSectionContainer left">
      <div class="container">
        <label>
          <v-icon></v-icon>
          <input type="file" id="file" v-on:change="handleFileUpload" />
        </label>
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
  padding: 2rem;
}

.btn {
  margin-top: 1.5rem;
}
.left form,
input {
  width: 100%;
}

.right {
  width: 70%;
  padding: 1rem;
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
