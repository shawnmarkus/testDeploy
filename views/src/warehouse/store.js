// this contains the login and logout logic

import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    isLoggedIn: sessionStorage.getItem("isLoggedIn"),
    // user: null,
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
    },
  },
  actions: {
    async login({ commit }, formData) {
      let response = "";
      try {
        response = await axios.post(
          "http://localhost:5001/login",
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
        // .then(function (response) {
        //   commit("setLoginDetail", response.data);
        // })
        // .catch((err) => console.log(err, "ye hai error"));

        if (response.status === 200) {
          commit("setLoginDetail", response.data);
        }
      } catch (err) {
        console.log("ERROR", err);
        throw err;
      }

      //   console.log("logout action se ho gya bhai from store bol rha hu");
    },

    async logout({ commit }) {
      //   var dd = "sjksaj";
      let resp = await axios
        .get("http://localhost:5001/logout", {
          withCredentials: true,
          crossDomain: true,
        })
        .then((data) => {
          commit("logout");
          console.log(data);
        })
        .catch((err) => console.log(err));

      console.log("logout ho gya bhai from store bol rha hu");
      //   return "shivam";
      //   commit("logout");
    },
  },
  getters: {
    user: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn,
    userRole: (state) => state.userRole,
  },
});

export default store;
