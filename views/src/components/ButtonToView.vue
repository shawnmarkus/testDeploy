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
.text {
  color: red;
}
</style>
