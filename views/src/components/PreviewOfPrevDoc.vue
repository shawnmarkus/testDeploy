<script>
import { defineComponent, reactive, watch } from "vue";
import Card from "./Card.vue";

export default defineComponent({
  components: {
    Card,
  },

  props: {
    userDataToRndr: {
      type: Object,
    },
  },

  /*
   *putting watch on props so that on update of the data only the data is transferred to next step
   */
  watch: {
    userDataToRndr(newValue) {
      this.userFeesObject = newValue;
    },
  },

  data(props) {
    return {
      userFeesObject: props.userDataToRndr,
    };
  },
});
</script>

<template>
  <div class="top">
    <Card :userFees="userFeesObject.feesDetail" />
  </div>
</template>

<style scoped>
.top {
  width: 95%;
  height: 98%;
  border-radius: 1rem;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  color: black;
  padding: 2rem;
}
</style>
