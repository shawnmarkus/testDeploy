<script>
export default {
  name: "ButtonToView",
  props: {
    isActive: {
      type: Object,
      default: () => ({ value: false }),
    },
    setItem: {
      type: Object,
    },
  },
  //   const emit = defineEmits(['update:items']),
  methods: {
    toggleActive() {
      //   this.isActive.value = !this.isActive.value;
      // this.$emit("update:isActive", !this.isActive.value);
      this.$emit("update:isActive", { value: !this.isActive.value });
    },
    setItemValue() {
      // console.log("set Item hai ", this.setItem);
      this.isActive.selectedStudent = this.setItem;
    },
  },
};
</script>

<template>
  <div>
    <v-btn
      class="btn"
      color="green"
      @click="
        toggleActive();
        setItemValue();
      "
      >Go</v-btn
    >
  </div>
</template>

<style scoped>
.btn {
  height: 3rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.text {
  color: red;
}
</style>
