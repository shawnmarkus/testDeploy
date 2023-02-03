<script>
import LoginPage from "../components/LoginPage.vue";

export default {
  components: {
    LoginPage,
  },
};
</script>

<template>
  <main>
    <LoginPage />
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: calc(100vh - 3.6rem);
  background-color: aliceblue;
  display: flex;
  place-items: center;
  place-content: center;
}
</style>
