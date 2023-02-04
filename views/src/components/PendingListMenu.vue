<script>
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    itemList: {
      type: Array,
    },
    // selected: {
    //   type: String,
    //   // default: () => itemList.feesSubmittedDoc[0].doc_url,
    // },
    selected: {
      type: Object,
      // default: () => itemList.feesSubmittedDoc[0].doc_url,
    },
  },

  methods: {
    changeTheSelectedVlaue() {
      this.$emit("update:selected", "shivam");
    },

    setSelected(value) {
      this.$emit("update:selected", value);
    },

    SelectedCard(_id) {
      if (this.selected.selectedCardId === _id) {
        return true;
      } else {
        return false;
      }
    },

    checkDisplay(status) {
      if (status !== "pending") {
        console.log("removed from list");
        return true;
      } else return false;
    },
  },
};
</script>

<template>
  <!-- <v-btn color="primary" @click="changeTheSelectedVlaue">click me</v-btn>
  <v-btn variant="text" @click="chnageTheSelectedVlaue">Close</v-btn>
  <div>Lorem40</div> -->

  <!-- <ul>
    <li v-for="(item, index) in itemList" :key="index">{{ item }}</li>
  </ul> -->

  <div class="pa-4">
    <v-card
      variant="tonal"
      v-for="(item, index) in itemList"
      :key="index"
      :class="{
        selectedCardCss: SelectedCard(item._id),
        // displayNone: item.status === 'verified',
        displayNone: checkDisplay(item.status),
      }"
    >
      <!-- <v-card-item v-if="item.status === 'pending'"> -->
      <v-card-item>
        <v-card-title> Name : {{ item.doc_url }} </v-card-title>

        <v-card-title> Status : {{ item.status }} </v-card-title>

        <v-card-subtitle>Amount: &nbsp;{{ item.feesAmount }}</v-card-subtitle>
        <v-card-actions>
          <v-btn
            class="btn"
            @click="
              setSelected({
                id: item._id,
                imgSrc: item.doc_url,
              })
            "
            >View</v-btn
          >
        </v-card-actions>
      </v-card-item>

      <!-- <v-card-text> This is content </v-card-text> -->
    </v-card>
  </div>
</template>

<style scoped>
.btn {
  height: 3rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.displayNone {
  display: none !important;
  margin: 0 !important;
}
.v-card {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
}
.v-btn {
  background-color: rgba(151, 151, 151, 0.717);
  color: rgb(255, 255, 255);
}
.v-card-title,
.v-card-subtitle {
  font-size: 1.25rem;
  padding: 0 1.25rem;
  margin-bottom: 0.5rem;
}

.selectedCardCss {
  background-color: #1c82ad;
  color: white;
}
</style>
