<script>
// import { RouterLink } from "vue-router";
import DialogForFeeUpload from "./DialogForFeesUpload.vue";
import axios from "axios";

export default {
  components: {
    DialogForFeeUpload,
  },

  data() {
    return {
      formData: {
        RollNumber: "",
        Name: "",
        contactNumber: "",
        branch: "",
        password: "",
        batch: "",
        userRole: "student",
        email: "",
        password: "",
        address: "",
        studentType: "",
        confirmPswd: "",
      },
      isActive: false,
    };
  },
  methods: {
    submitForm() {
      // Send formData to server or handle it in some other way
      console.log("formdata:", this.formData);
      axios
        .post(
          "https://backendfyndcapstoneproject-shawnmarkus.onrender.com/register",
          this.formData,
          {
            crossDomain: true,
          }
        )
        .then((data) => {
          console.log("YOU GOT REGISTERED ", data);
          this.formData.RollNumber = "";
          this.formData.Name = "";
          this.formData.batch = "";
          this.formData.branch = "";
          this.formData.confirmPswd = "";
          this.formData.password = "";
          this.formData.contactNumber = "";
          this.formData.email = "";
          this.formData.userRole = "";
          this.formData.address = "";
          this.formData.studentType = "";

          // changing route
          this.$router.replace("/login");
        })
        .catch((error) => {
          "FAILED TO REGISTER", error;
        });
    },

    toggleDialog() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<template>
  <div class="Register_master_container">
    <!-- <div class="title">Register</div>
    <hr /> -->

    <!-- register form -->
    <form @submit.prevent="submitForm">
      <!-- for userID or roll number-->
      <div class="input-box-container">
        <input
          type="text"
          v-model="formData.RollNumber"
          name="userId"
          placeholder="Roll number"
          id="userId"
        />
      </div>

      <!-- name  -->
      <div class="input-box-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          v-model="formData.Name"
        />
      </div>

      <!-- contact number -->
      <div class="input-box-container">
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          id="contactNumber"
          v-model="formData.contactNumber"
        />
      </div>

      <!-- branch -->
      <div class="input-box-container">
        <div class="radioConatiner">
          <label for="">Branch: &emsp;</label>
          <div class="optioncontainer">
            <input
              id="CSE"
              type="radio"
              name="option"
              value="CSE"
              v-model="formData.branch"
            />
            <label for="CSE">CSE</label>
          </div>

          <div class="optioncontainer">
            <input
              id="EE"
              type="radio"
              name="option"
              value="EE"
              v-model="formData.branch"
            />
            <label for="EE">EE</label>
          </div>

          <div class="optioncontainer">
            <input
              id="EL"
              type="radio"
              name="option"
              value="EL"
              v-model="formData.branch"
            />
            <label for="EL">EL</label>
          </div>
        </div>
      </div>

      <!-- batch -->
      <div class="input-box-container">
        <input
          type="text"
          name="batch"
          placeholder="Year On Admission"
          id="batch"
          v-model="formData.batch"
        />
      </div>

      <!-- email -->
      <div class="input-box-container">
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          v-model="formData.email"
        />
      </div>

      <!-- address -->
      <div class="input-box-container">
        <input
          type="text"
          name="address"
          placeholder="Address"
          id="address"
          v-model="formData.address"
        />
      </div>

      <!-- student type -->
      <div class="input-box-container">
        <label>Student Type: &emsp;</label>
        <select
          name="studentType"
          id="studentType"
          v-model="formData.studentType"
        >
          <option value="" disabled selected>Select year</option>

          <option
            v-for="item in ['hosteller', 'nonhosteller', 'feewaiver']"
            :key="item"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <!-- for password -->
      <div class="input-box-container">
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          v-model="formData.password"
          autocomplete="true"
        />
      </div>

      <!-- for confirm password -->
      <div class="input-box-container">
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirmPassword"
          id="confirmPassword"
          v-model="formData.confirmPswd"
          autocomplete="true"
          s
        />
      </div>
      <!--  -->

      <!-- button to submit -->
      <v-btn
        class="submit-Btn"
        @click="toggleDialog"
        rounded="pill"
        block
        color="green"
        >submit</v-btn
      >
      <!-- dialog -->
      <v-dialog persistant v-model="isActive" class="centerblock" width="600">
        <!-- {{ feesFormData }} -->
        <v-card>
          <DialogForFeeUpload :formData="formData" />
          <v-card-actions class="leftPadding">
            <v-btn class="btn" color="red" @click="toggleDialog">Return</v-btn>

            <v-btn
              class="btn"
              color="green"
              @click="
                submitForm();
                toggleDialog();
              "
              >submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </form>
  </div>
</template>

<style scoped>
.btn {
  margin-top: 1.5rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.Register_master_container {
  padding: 1.25rem;
  color: black;
  min-width: 40%;
  min-height: 50%;
}

.leftPadding {
  padding-left: 2.5rem;
  padding-bottom: 1.85rem;
}

form {
  margin: 2.5rem 1.85rem;
}

input {
  width: 100%;
  background-color: rgba(206, 206, 206, 0.46);
  padding: 0.75rem 0.8rem;
  border-radius: 5px 5px 0 0;
  border-bottom: 0.7px solid black;
  outline: 0;
}

.input-box-container {
  margin-top: 0.8rem;
}

.submit-Btn {
  padding: 1.62rem 2.5rem;
  font-size: 1rem;
  margin-top: 1.85rem;
}

.radioConatiner {
  display: flex;
  flex-wrap: wrap;
}

.optioncontainer {
  display: flex;
  margin: 0 1.25rem;
}

#studentType {
  background-color: rgb(206, 206, 206, 0.46);
  padding: 0.25rem 0.625rem;
  outline: 0;
}

select {
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.94rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 2.5rem !important;
}

button {
  color: hsla(160, 100%, 37%, 1);
}
</style>
