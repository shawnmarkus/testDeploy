<script>
import DialogForFeeUpload from "./DialogForFeesUpload.vue";
import axios from "axios";

export default {
  components: {
    DialogForFeeUpload,
  },

  data() {
    return {
      // check whether the current session value is changed on change on value of the currentSession
      feesFormData: {
        currentSession: "",
        feesType: "",
        feesdata: {
          1: "",
          2: "",
          3: "",
          4: "",
        },
      },

      // for button
      isActive: false,

      years: [],

      selectedYear: "",

      feesType: ["feewaiver", "hosteler", "nonhostler", "extra"],
    };
  },
  created() {
    for (
      let i = new Date().getFullYear();
      i >= new Date().getFullYear() - 10;
      i--
    ) {
      this.years.push(i);
    }
    // console.log(this.years);
  },

  watch: {
    selectedYear(newValue) {
      this.feesFormData.currentSession = `${parseInt(newValue)}-${
        parseInt(newValue) + 1
      }`;
      console.log(this.feesFormData.currentSession);
    },
  },

  methods: {
    setIsActive() {
      this.isActive = !this.isActive;
    },

    toggleDialog() {
      this.isActive = !this.isActive;
    },

    async submitForm() {
      // axios request

      try {
        let response = await axios.post(
          "http://localhost:5001/admin",
          this.feesFormData,
          {
            withCredentials: true,
            crossDomain: true,
          }
        );

        // console.log(response);
        if (response.status === 401) {
          console.log("failed");
          window.location = "/login";
        } else {
          console.log(response.status);
          console.log("success");
          this.feesFormData.currentSession = "";
          this.feesFormData.feesType = "";
          this.feesFormData.feesdata[1] = "";
          this.feesFormData.feesdata[2] = "";
          this.feesFormData.feesdata[3] = "";
          this.feesFormData.feesdata[4] = "";
          this.selectedYear = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent>
    <div class="gridBox">
      <div class="left">
        <label for="currentSession">Select Session: &emsp;</label>
        <select
          name="currentSession"
          v-model="selectedYear"
          id="currentSession"
          class="select"
        >
          <option class="option" value="" disabled selected>Select year</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <label for="feesType">Select feesType: &emsp;</label>
        <select name="feesType" v-model="feesFormData.feesType" id="feesType">
          <option value="" disabled selected>Select Fees Type</option>
          <option v-for="Type in feesType" :key="Type" :value="Type">
            {{ Type }}
          </option>
        </select>
      </div>

      <!-- right side box -->
      <div class="right">
        <p class="title">fees Detail</p>
        <div class="feesBoxContainer">
          <label for="1">1st year</label>
          <input
            type="number"
            name="1"
            id="1"
            v-model="feesFormData.feesdata[1]"
          />
        </div>
        <div class="feesBoxContainer">
          <label for="2">2nd year</label>
          <input
            type="number"
            name="2"
            id="2"
            v-model="feesFormData.feesdata[2]"
          />
        </div>
        <div class="feesBoxContainer">
          <label for="3">3rd year</label>
          <input
            type="number"
            name="3"
            id="3"
            v-model="feesFormData.feesdata[3]"
          />
        </div>
        <div class="feesBoxContainer">
          <label for="4">4th year</label>
          <input
            type="number"
            name="4"
            id="4"
            v-model="feesFormData.feesdata[4]"
          />
        </div>
      </div>
    </div>

    <!-- button to submit -->
    <div class="bottonDiv">
      <v-btn class="btn" color="green" @click="setIsActive"> preview </v-btn>
    </div>

    <v-dialog persistant v-model="isActive" width="600">
      <!-- {{ feesFormData }} -->
      <v-card>
        <DialogForFeeUpload :formData="feesFormData" />
        <v-card-actions class="spaceBetween leftPadding">
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
</template>

<style scoped>
.btn {
  height: 3rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.spaceBetween {
  display: flex;
  justify-content: space-around;
}

.leftPadding {
  padding-left: 2rem;
  padding-bottom: 1.5rem;
}

form {
  height: calc(100% - 4rem);
  padding: 1rem;
  display: grid;
  grid-template-rows: 10fr 2fr;
}

label {
  color: black;
  padding: 1rem 0 0 0;
}

select {
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  background-color: rgb(206, 206, 206, 0.46);
  padding: 0.5rem 1rem;
  outline: 0;
  height: 3rem;
  margin: 0.5rem 0;
}

.gridBox {
  display: grid;
  grid-template-columns: 2fr 3fr;
}

.left {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  border-right: 1px solid black;
}

.right {
  width: 100%;
  padding: 1.5rem;
  display: grid;
}

.title {
  color: black;
  font-weight: 1000;
  font-size: 2.5rem;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  background-color: rgba(206, 206, 206, 0.46);
  padding: 0.5rem 0.6rem;
  border-radius: 5px 5px 0 0;
  border-bottom: 0.7px solid black;
  outline: 0;
}

.bottonDiv {
  padding-left: 1rem;
}

.feesBoxContainer {
  padding: 0.4rem 0;
}
</style>
