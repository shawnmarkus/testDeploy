<script>
import axios from "axios";
export default {
  data() {
    return {
      isActive: false,
      tab: null,
      isEligible: false,
      canOTPbeSend: false,
      canCreatePasswrd: false,
      error: "",
      email: "",
      OTP: "",
      passwrd: "",
      confirmPasswrd: "",
      alert: false,
    };
  },

  methods: {
    changeTheTab(target) {
      this.tab = target;
    },

    async sendOTPtoEmail() {
      if (!this.email) {
        this.alert = true;
        this.error = "please provide email";
        setTimeout(() => {
          this.alert = false;
          this.error = null;
        }, 1000 * 4);
        return;
      }

      let response = await axios
        .post(
          "http://localhost:5001/sendOTP",
          { email: this.email },
          {
            withCredentials: true,
            crossDomain: true,
          }
        )
        .catch((error) => {
          console.log(error.response.data.msg);
          this.alert = true;
          this.error = error.response.data.msg;

          setTimeout(() => {
            this.alert = false;
            this.error = null;
          }, 1000 * 4);
        });

      if (response && response.status === 200) {
        console.log("this is the response ", response.status);
        this.canOTPbeSend = true;
        this.isEligible = true;
        this.changeTheTab("tab-2");
      }
      //   if (response) {
      //     console.log(response.status);
      //   }
    },

    async verifyOTP() {
      if (!this.OTP) {
        this.alert = true;
        this.error = "please enter OTP";
        setTimeout(() => {
          this.alert = false;
          this.error = null;
        }, 1000 * 4);
        return;
      }

      let response = await axios
        .post(
          "http://localhost:5001/verifyOTP",
          { OTP: this.OTP },
          {
            withCredentials: true,
            crossDomain: true,
          }
        )
        .catch((error) => {
          console.log(error.response.data.msg);
          this.alert = true;
          this.error = error.response.data.msg;

          setTimeout(() => {
            this.alert = false;
            this.error = null;
          }, 1000 * 4);
        });

      if (response && response.status === 200) {
        this.canCreatePasswrd = true;
        this.canOTPbeSend = false;
        // console.log("this is the response ", response.status);
        this.changeTheTab("tab-3");
      }
    },
    async sendRequestToChangePassword() {
      if (this.confirmPasswrd !== this.passwrd) {
        this.alert = true;
        this.error = "please enter the  matching password ";
        setTimeout(() => {
          this.alert = false;
          this.error = null;
        }, 1000 * 4);
      }

      let response = await axios
        .put(
          "http://localhost:5001/resetpassword",
          { email: this.email, password: this.passwrd },
          {
            withCredentials: true,
            crossDomain: true,
          }
        )
        .catch((error) => {
          console.log(error.response.data.msg);
          this.alert = true;
          this.error = error.response.data.msg;

          setTimeout(() => {
            this.alert = false;
            this.error = null;
          }, 1000 * 4);
        });

      if (response && response.status === 200) {
        console.log("SUCCESSFULLY CHANGED ");
      }
      console.log("inside the password reset ");
    },
  },
};
</script>

<template>
  <div>
    <v-alert
      v-model="alert"
      border="start"
      variant="tonal"
      type="error"
      closable
      :text="error"
    >
    </v-alert>

    <v-tabs height="75" v-model="tab" bg-color="#00bd7e">
      <!-- <v-tag></v-tag> -->
      <v-tab value="tab-1" :disabled="this.isEligible !== false">
        <div class="v-tabs">email</div>
      </v-tab>

      <v-tab value="tab-2" :disabled="this.canOTPbeSend === false">
        <div class="v-tabs">OTP</div>
      </v-tab>

      <v-tab value="tab-3" :disabled="this.canCreatePasswrd === false">
        <div class="v-tabs">Create Password</div>
      </v-tab>
    </v-tabs>

    <v-window class="container" v-model="tab">
      <v-window-item value="tab-1">
        <v-card>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Registered Email"
            v-model="email"
          />
          <!-- <v-card-actions class="leftPadding"> -->
          <v-btn class="btn" color="green" @click="sendOTPtoEmail"
            >Proceed</v-btn
          >
          <!-- </v-card-actions> -->
        </v-card>
      </v-window-item>
      <v-window-item value="tab-2">
        <v-card>
          <v-card>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Registered Email"
              v-model="OTP"
            />
            <!-- <v-card-actions class="leftPadding"> -->
            <v-btn class="btn" color="green" @click="verifyOTP">Proceed</v-btn>
            <!-- </v-card-actions> -->
          </v-card>
        </v-card>
      </v-window-item>
      <v-window-item value="tab-3">
        <v-card>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="password"
            v-model="passwrd"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="confirm password"
            v-model="confirmPasswrd"
          />
          <!-- <v-card-actions class="leftPadding"> -->
          <v-btn class="btn" color="green" @click="sendRequestToChangePassword"
            >Done</v-btn
          >
          <!-- </v-card-actions> -->
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
.btn {
  font-size: 1rem;
  padding: 0rem 2.5rem;
  margin-top: 1rem;
  height: 3rem;
}
.v-tabs {
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.container {
  margin: 2.5rem;
  width: calc(100% - 5rem);
}

input {
  font-size: 1.25rem;

  width: 100%;
  background-color: rgba(206, 206, 206, 0.46);
  padding: 0.75rem 0.8rem;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid black;
  outline: 0;
  margin-bottom: 1rem;
}
</style>
