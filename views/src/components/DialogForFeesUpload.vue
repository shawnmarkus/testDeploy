<script>
import Loading from "./LoaderComponent.vue";
export default {
  components: {
    Loading,
  },

  props: {
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },

  created() {
    if (this.formData) {
      this.isLoading = false;
    }
  },

  methods: {
    typeOf(item) {
      console.log(typeof item);
      if (typeof item === "object") return true;
      else return false;
    },
  },
};
</script>

<template>
  <div class="pa-10">
    <Loading v-if="isLoading"></Loading>
    <div v-else>
      <div v-for="(item, index) in formData" :key="index">
        <span class="largeFont bolder"
          ><b>{{ index }} :</b> &emsp;</span
        >
        <span v-if="typeOf(item)">
          <span v-for="(iterObj, _indx) in item" :key="_indx">
            <div>
              <span class="pad-left largeFont"
                ><b>Year {{ _indx }}: &nbsp;</b>
              </span>
              <span class="largeFont">{{ iterObj }}</span>
            </div>
          </span>
        </span>
        <span v-else class="largeFont">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pad-left {
  padding-left: 1.25rem;
}

.bolder {
  font-weight: 600;
}

.largeFont {
  font-size: 1.3rem;
}
</style>
