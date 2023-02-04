<script>
import { RouterLink } from "vue-router";
import store from "../warehouse/store";
import VTabsForForgotPasswrd from "./VTabsForForgotPasswrd.vue";

export default {
  components: { VTabsForForgotPasswrd },
  data() {
    return {
      formData: {
        userID: "",
        password: "",
      },

      email: "",
      dialog: false,
      error: "",
      alert: false,
    };
  },

  methods: {
    sendRequest: async function () {
      this.error = "";
      await store
        .dispatch("login", this.formData)
        .then(() => {
          console.log("from login page ", this.$store.getters.userRole);
          if (this.$store.state.userRole === "admin")
            this.$router.replace("/admin/verify");
          else this.$router.replace("/");
        })
        .catch((error) => {
          this.alert = true;
          this.error = error.message;
          // console.log(error.message);

          // this is set to remove the error message
          setTimeout(() => {
            this.error = "";
            this.alert = false;
          }, 1000 * 4);
        });
    },
  },
};
</script>

<template>
  <div class="Login_master_container">
    <div class="title">Login</div>
    <hr />
    <!-- <div v-if="error">{{ error }}</div> -->

    <v-alert
      v-model="alert"
      border="start"
      variant="tonal"
      type="error"
      closable
      :text="error"
    >
    </v-alert>

    <!-- <div v-if="!alert" class="text-center">
      <v-btn @click="alert = true"> Reset </v-btn>
    </div> -->

    <!-- login form -->
    <form @submit.prevent="sendRequest">
      <!-- for userID -->
      <div class="input-box-container">
        <input
          type="text"
          v-model="formData.userID"
          name="userId"
          placeholder="UserId"
          id="userId"
        />
      </div>

      <!-- for password -->
      <div class="input-box-container">
        <input
          type="text"
          name="password"
          placeholder="Password"
          id="password"
          v-model="formData.password"
        />
      </div>

      <!-- button to submit -->
      <v-btn type="submit" class="submit-Btn" rounded="pill" block color="green"
        >submit</v-btn
      >

      <!-- dialog for forgot password -->
      <div class="options">
        <!-- dialog box  -->
        <div class="text-center">
          <v-dialog v-model="dialog">
            <!-- <v-card-actions> -->
            <!-- <v-btn color="red"  @click="dialog = false">Close </v-btn> -->
            <!-- </v-card-actions> -->
            <template v-slot:activator="{ props }">
              <v-btn class="showModel" v-bind="props"> forgot Password </v-btn>
            </template>

            <v-card class="dialogBoxForEmail">
              <VTabsForForgotPasswrd />
              <!-- <v-card-actions>
                <v-btn color="red" block @click="dialog = false">Close </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
        </div>
        <!-- end -->
        <div class="register-div">
          <div>New here? &nbsp;</div>
          <RouterLink to="/register">Register</RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.title {
  color: green;
  font-family: "Times New Roman", Times, serif;
  font-size: 1.9rem;
  padding-left: 0.75rem;
  /* border-bottom: 1px solid rgba(2, 2, 2, 0.55); */
}
hr {
  margin: 0.75rem 0 0.75rem 0;
  width: 100%;
}
.Login_master_container {
  padding: 1rem;
  color: black;
  min-width: 40%;
  min-height: 50%;
  box-shadow: 5px 10px 10px 6px rgba(155, 155, 155, 0.585);
  border-radius: 10px;
}

form {
  margin: 2.5rem 1.9rem;
}

input {
  width: 100%;
  background-color: rgba(206, 206, 206, 0.46);
  padding: 0.7rem 0.75rem;
  border-radius: 5px 5px 0 0;
  border-bottom: 0.7px solid black;
  outline: 0;
}

.input-box-container {
  margin-top: 1.25rem;
}

.submit-Btn {
  padding: 1.7rem 2.5rem;
  margin-top: 1.8rem;
  font-size: 1rem;
}

.options {
  margin: 1rem;
}

.register-div {
  display: flex;
}

button {
  color: hsla(160, 100%, 37%, 1);
}

.text-center {
  width: fit-content;
  height: fit-content;
}

.showModel {
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-shadow: none;
  font-size: 1.25;
  background: transparent;
}

.dialogBoxForEmail {
  align-self: center;
  width: 60%;
  height: fit-content;
}

.forgotPasswordForm {
  margin-bottom: 0;
}

.v-dialog {
  background-color: rgba(57, 57, 57, 0.625);
}
</style>
