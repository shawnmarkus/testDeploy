import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../warehouse/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn && store.getters.userRole === "student") {
          next();
        } else {
          next("/invalid_request");
        }
      },
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/admin/verify",
      name: "verify",
      component: () => import("../components/VerifyDocAdmin.vue"),
      beforeEnter(to, from, next) {
        if (store.getters.userRole === "admin") {
          next();
        } else {
          next("/invalid_request");
        }
      },
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegistrationViewStudent.vue"),
    },

    {
      path: "/login",
      name: "loginPage",
      component: () => import("../views/LoginPageView.vue"),
    },

    {
      path: "/admin/feesUpload",
      name: "feesUpload",
      component: () => import("../views/FeesUploadView.vue"),
      beforeEnter(to, from, next) {
        if (store.getters.userRole === "admin") {
          next();
        } else {
          next("/invalid_request");
        }
      },
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/invalid_request",
      name: "Invalid Request",
      component: () => import("../views/InvalidRequest.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "login" && store.getters.isLoggedIn) {
    store.dispatch("logout");
    next("/login");
  }

  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next({
      path: "/login",
    });
  } else {
    // write a login to check wheater the  requested page in present in the $route
    next(); // make sure to always call next()!
  }
});

// router.beforeEach((to, from, next) => {
//   console.log("he?");
//   next();
// });

export default router;
