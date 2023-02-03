<script setup>
import FeesUpload from "../components/FeesUpload.vue";
</script>

<template>
  <main>
    <div class="masterContainer">
      <h1>Fees Upload Panel</h1>
      <FeesUpload />
    </div>
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

.masterContainer {
  /* text-align: center; */
  width: 80%;
  height: 80%;
  /* background-color: red; */
  box-shadow: 5px 10px 10px 6px rgba(155, 155, 155, 0.585);
  border-radius: 5px;
  overflow: hidden;
}

.masterContainer > h1:first-of-type {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  /* font-size: xx-larg; */
  font-weight: bold;
  box-shadow: 0px 2px 4px 1px rgba(155, 155, 155, 0.585);

  padding: 0.5rem 2rem;
}
</style>
