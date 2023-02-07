// this contains the login and logout logic

import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    isLoggedIn: sessionStorage.getItem("isLoggedIn"),
    userRole: sessionStorage.getItem("userRole"),
  },

  mutations: {
    setLoginDetail(state, responseData) {
      sessionStorage.setItem("userRole", responseData.userRole);
      sessionStorage.setItem("isLoggedIn", true);

      state.userRole = sessionStorage.getItem("userRole");
      state.isLoggedIn = sessionStorage.getItem("isLoggedIn");
    },

    logout(state) {
      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("isLoggedIn");
      state.userRole = null;
      state.isLoggedIn = false;
    },
  },
  actions: {
    async login({ commit }, formData) {
      let response = "";
      try {
        response = await axios.post(
          "https://backendfyndcapstoneproject-shawnmarkus.onrender.com/login",
          {
            RollNumber: formData.userID,
            password: formData.password,
          },
          {
            // these 2 options is necessary for the setting the cookies when using cross server
            withCredentials: true,
            crossDomain: true,
          }
        );

        if (response.status === 200) {
          commit("setLoginDetail", response.data);
        }
      } catch (err) {
        console.log("ERROR", err);
        throw err;
      }
    },

    async logout({ commit }) {
      let resp = await axios
        .get(
          "https://backendfyndcapstoneproject-shawnmarkus.onrender.com/logout",
          {
            withCredentials: true,
            crossDomain: true,
          }
        )
        .then((data) => {
          commit("logout");
          console.log(data);
        })
        .catch((err) => console.log(err));

      console.log("logout ho gya bhai from store bol rha hu");
    },
  },
  getters: {
    user: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn,
    userRole: (state) => state.userRole,
  },
});

export default store;
