<script>
import PendingListMenu from "./PendingListMenu.vue";
import axios from "axios";
export default {
  name: "ContentView",
  props: {
    isActive: {
      type: Object,
      default: () => ({ value: false }),
    },
  },

  data() {
    return {
      selected: {
        selectedCardId: "",
        imgSrc: "",
      },

      pendingDocList: this.isActive.selectedStudent.feesDetail.feesSubmittedDoc,
    };
  },

  mounted() {
    for (const [key, value] of Object.entries(this.pendingDocList)) {
      if (value.status === "pending") {
        this.selected.selectedCardId = value._id;
        this.selected.imgSrc = value.doc_url;
        break;
      }
    }
  },

  methods: {
    closeTheDialog() {
      // you can change the value in either way but the parent must have @update:propsName="(value) => (propsName= value)" property corresponding to it or v-model:propsName="vale"
      this.$emit("update:isActive", { value: false });
    },

    updateSelected(newValue) {
      // this.selected = newValue;
      console.log(newValue, "naya value aya hai re baba");
      if (newValue.id) {
        this.selected.selectedCardId = newValue.id;
      }
      if (newValue.imgSrc) {
        this.selected.imgSrc = newValue.imgSrc;
      }
    },

    // this function takes the status as arg
    async verifyTheFeeDoc(valueSet) {
      console.log(valueSet, "tail to student");

      const docStatusResponse = await axios.patch(
        "https://backendfyndcapstoneproject-shawnmarkus.onrender.com/admin",
        valueSet,
        {
          withCredentials: true,
          crossDomian: true,
        }
      );

      // function to remove the appproved item from pending status doc list and that is update in isActive.selectedStudent.feesDetail.feesSubmittedDoc
      if (docStatusResponse.data.status === "SUCCESS") {
        console.log(
          "LENGTH OF THE PENDING DOC LIST BEFORE ==>",
          this.pendingDocList.length
        );

        this.pendingDocList = this.pendingDocList.filter((data) => {
          if (data._id === valueSet.docId) {
            return false;
          } else return true;
        });

        console.log(
          "LENGTH OF THE PENDING DOC LIST AFTER ==>",
          this.pendingDocList.length
        );

        // now the selected item needs to be shiftef to next item
        /*
         *  we have to update the selected object to next pending  object
         */

        for (let [key, value] of Object.entries(
          this.isActive.selectedStudent.feesDetail.feesSubmittedDoc
        )) {
          if (value._id === valueSet.docId) {
            console.log("key to change", key);
            // we used the props because the pendingList will remove the item which we are seaching
            this.selected.selectedCardId =
              this.isActive.selectedStudent.feesDetail.feesSubmittedDoc[
                ++key
              ]._id;
            this.selected.imgSrc =
              this.isActive.selectedStudent.feesDetail.feesSubmittedDoc[
                ++key
              ].doc_url;
            break;
          }
        }
      }
    },
  },

  components: {
    PendingListMenu,
  },
};
</script>

<template>
  <v-card>
    <v-toolbar color="hsla(160, 100%, 37%, 1)" title="Pending Status list ">
      <v-card-actions class="justify-end">
        <v-btn class="btn" variant="text" @click="closeTheDialog">Close</v-btn>
      </v-card-actions>
    </v-toolbar>
    <div class="templateGridOfContent">
      <div class="left">
        <div class="insiderLeft">
          <h2>
            <b>{{ this.isActive.selectedStudent.Name }}</b>
          </h2>
          <!-- the below shown is another way to pass the props and update its value from inside the child -->
          <PendingListMenu
            v-bind:selected="selected"
            v-on:update:selected="updateSelected"
            :itemList="this.pendingDocList"
          />
        </div>
      </div>
      <!-- right block -->
      <div class="right">
        <div class="rightUpper d-flex justify-center align-center">
          <!-- image -->
          <v-img
            class="bg-white"
            width="100"
            :aspect-ratio="1"
            :src="selected.imgSrc"
          ></v-img>
        </div>
        <div class="rightLower">
          <!-- buttons to accept ot reject -->
          <v-card-actions class="justify-end">
            <v-btn
              class="btn"
              variant="text"
              @click="
                verifyTheFeeDoc({
                  docId: selected.selectedCardId,
                  id: this.isActive.selectedStudent._id,
                  signal: 'verified',
                })
              "
              >Accept</v-btn
            >
            <v-btn
              class="btn"
              variant="text"
              @click="
                verifyTheFeeDoc({
                  docId: selected.selectedCardId,
                  id: this.isActive.selectedStudent._id,
                  signal: 'failed',
                })
              "
              >Reject</v-btn
            >
          </v-card-actions>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.btn {
  height: 3rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.v-toolbar {
  color: beige;
}

.v-card-text {
  color: black;
}
.templateGridOfContent {
  display: grid;
  grid-template-columns: 40% auto;
  overflow: auto;
  height: 100%;
}
.left {
  overflow-y: scroll;
  padding-bottom: 1.25rem;
}
.right {
  box-shadow: inset 0 0 20px 10px rgb(162, 162, 162);
  max-height: calc(100vh - 5rem);
  padding: 2.5rem;
  display: grid;
  grid-template-rows: 85% 15%;
}

.insiderLeft {
  display: flex;
  flex-direction: column;
  position: relative;
}

.insiderLeft > h2 {
  position: sticky;
  z-index: 100;
  margin-bottom: 1.25rem;
  background-color: #00337c;
  top: 0;
  color: white;
  padding: 1.25rem 2.5rem;
}

.rightUpper {
  height: 100%;
  background-color: red;
  color: white;
  /* text-align: center; */
  /* display: grid; */
}

.rightUpper img {
  z-index: 2000;
}

.rightLower {
  height: 100%;
  background-color: rgb(107, 107, 249);
  display: flex;
  padding: 1.25rem;
  justify-content: space-around;
}
.rightLower > .v-card-actions > .v-btn:first-child {
  background-color: #03c988;
}

.rightLower > .v-card-actions > .v-btn:last-child {
  background-color: #ff7b54;
}

.rightLower > .v-card-actions > .v-btn {
  padding: 0.65rem 1.85rem;
  color: white;
}

::-webkit-scrollbar {
  width: 0.4em;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #797979c0;
}
</style>
