<script>
export default {
  methods: {
    returnToPage() {
      if (
        this.$store.getters.isLoggedIn &&
        this.$store.getters.userRole === "admin"
      ) {
        this.$router.replace("/admin/verify");
      } else if (
        this.$store.getters.isLoggedIn &&
        this.$store.getters.userRole === "student"
      ) {
        this.$router.replace("/");
      } else {
        this.$route.replace("/login");
      }
    },
  },
};
</script>
<template>
  <div class="main">
    <div class="title">
      <h1>401: Invalid page</h1>
    </div>
    <div class="btn">
      <v-btn @click="returnToPage" color="green">return</v-btn>
    </div>
  </div>
</template>
<style scoped>
.main {
  width: 100vw;
  height: calc(100vh - 3.6rem);
  background-color: aliceblue;
  display: flex;
  place-items: center;
  place-content: center;
  flex-direction: column;
  color: rgba(34, 33, 33, 0.69);
}
.title {
  font-weight: bolder;
  font-size: xx-large;
  padding-bottom: 2rem;
  font-family: "Times New Roman", Times, serif;
}
</style>
