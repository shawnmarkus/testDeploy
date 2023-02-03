<script>
import { reactive, defineComponent, onBeforeMount, onMounted } from "vue";
import axios from "axios";
import FeeLister from "./FeeLister.vue";
import store from "../warehouse/store";

export default defineComponent({
  setup() {
    const data = reactive({
      list: [],
      error: "",
    });
    onBeforeMount(async () => {
      await axios
        .get("http://localhost:5001/admin", {
          withCredentials: true,
          crossDomain: true,
        })
        .then((resp) => {
          data.list = resp.data.data[0].pendingRequestQueue;
          store.state["list"] = resp.data.data[0].pendingRequestQueue;
          // data.errorToPass = resp.status;
          // console.log("see what is the responce", resp.data);
        })
        .catch((error) => {
          console.log(error.message);
          data.error = error.message;
        });
    });
    return { data };
  },
  components: { FeeLister },
});
</script>

<template>
  <div class="mainEnclosingContainer">
    <div class="secondaryContainer">
      <h1>Verify Document</h1>
      <div class="lowerPart">
        <!-- {{ this.data.list }} -->
        <!-- <div v-if="data.list.length > 0"> -->
        <FeeLister :StudentListWithfeeDetail="data.list" :error="data.error" />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainEnclosingContainer {
  width: 100vw;
  height: calc(100vh - 3.6rem);
  background-color: aliceblue;
  color: black;
  padding: 2rem;

  /* overflow: scroll; */
}

.secondaryContainer {
  width: 100%;
  height: calc(100vh - 3.6rem - 4rem);
  box-shadow: 0px 0px 15px 6px rgba(155, 155, 155, 0.585);
}
.secondaryContainer h1 {
  color: white;
  font-weight: 600;
  background-color: hsla(160, 100%, 37%, 1);
  /* color: hsla(160, 100%, 37%, 1); */
  font-size: 2rem;

  padding: 0.5rem 2rem;
}

.lowerPart {
  width: 100%;
  word-break: break-word;
  padding: 0.5rem 1rem;
  height: calc(100vh - 3.6rem - 4rem - 1rem - 3.25rem);
}
</style>
