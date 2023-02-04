<script setup>
import RegisterStudentPage from "../components/RegisterStudentPage.vue";
</script>

<template>
  <main>
    <div class="masterBox">
      <div class="left"><div class="center">Registeration</div></div>
      <RegisterStudentPage class="right" />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: calc(100vh - 4.5rem);
  background-color: aliceblue;
  display: flex;
  place-items: center;
  place-content: center;
}

.masterBox {
  width: calc(80vw);
  /* min-width: 720px; */
  height: 90%;
  display: grid;
  grid-template-columns: 6fr 6fr;
  box-shadow: 5px 10px 10px 6px rgba(155, 155, 155, 0.585);
}

.masterBox .left {
  color: white;
  background-color: hsla(160, 100%, 37%, 1);
  display: grid;
}

.left .center {
  justify-self: center;
  align-self: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: x-large;
}

.masterBox .right {
  width: 100%;
}
</style>
