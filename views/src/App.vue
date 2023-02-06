<script>
import { RouterLink, RouterView } from "vue-router";
// import store from "./warehouse/store";
export default {
  methods: {
    async signout() {
      console.log("singout");
      await this.$store.dispatch("logout").then((data) => {
        console.log("refresh page");
        // window.location = "/login";
        this.$router.replace("/login");
      });
    },
  },
};
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/" v-if="this.$store.getters.userRole === 'student'"
            >Home</RouterLink
          >
          <RouterLink
            to="/admin/verify"
            v-if="this.$store.getters.userRole === 'admin'"
            >Verify</RouterLink
          >
          <RouterLink
            to="/admin/feesUpload"
            v-if="this.$store.getters.userRole === 'admin'"
            >Fee Upload</RouterLink
          >
          <RouterLink to="/register" v-if="!this.$store.getters.isLoggedIn"
            >Register</RouterLink
          >
          <RouterLink to="/login" v-if="!this.$store.getters.isLoggedIn"
            >Login</RouterLink
          >
          <RouterLink @click="signout" v-else to="/login">Logout</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
nav {
  font-size: 1.25rem;
  text-align: center;
  padding: 1.25rem;
}

nav a {
  padding: 0.75rem 1.25rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/* 
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} 
*/
</style>
