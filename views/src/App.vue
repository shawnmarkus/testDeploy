<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  methods: {
    async signout() {
      console.log("singout");
      await this.$store.dispatch("logout").then((data) => {
        console.log("refresh page");
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
</style>
