<script>
import { defineComponent, reactive, watch } from "@vue/runtime-core";
import ButtonToView from "./ButtonToView.vue";
import ContentView from "./ContentView.vue";
import LoaderComponent from "./LoaderComponent.vue";

/*
 *useRouter for router
 * and the useRoute is for route
 */
import { useRouter, useRoute } from "vue-router";

import axios from "axios";
export default defineComponent({
  props: {
    StudentListWithfeeDetail: {
      type: Object,
    },
    error: {
      type: String,
    },
  },

  setup(props) {
    // const router = useRouter();
    const route = useRoute();

    const data = reactive({
      stdList: [],
      loading: true,
      isActive: {
        value: false,
        // the below variable is to hold the selected student data

        // StdRequiredData: {
        //   id: "",
        //   feesDetail: [],
        // },

        // it will be assigned a complete doc of student which is selected
        // pendingStatusListOfStudent: "",

        selectedStudent: {},
      },

      dialog: false,
    });

    const change = () => {
      console.log("ye tere abba");
      for (let i in data.stdList) {
        console.log(data.stdList[i]);
      }
    };

    watch(
      () => props.StudentListWithfeeDetail,
      (list) => {
        if (list.length != 0) {
          setTimeout(() => {
            data.stdList = list;
            // console.log("abey data aa gya hai", typeof list, list.length);
            data.loading = false;
            change();
          }, 1000 * 2);
        }
      }
    );

    watch(
      () => props.error,
      (error) => {
        console.log(`the value changed from ${error} `);
        data.loading = false;
      }
    );

    const updateIsActive = (valueSet) => {
      if (String(valueSet.value)) {
        data.isActive.value = valueSet.value;
      }

      //   if (valueSet.docId) {
      //     // data.isActive.pendingStatusListOfStu\\dent =
      //     //   data.isActive.pendingStatusListOfStu\\dent.filter((data) => {
      //     //     if (data.docId === valueSet.docId) {
      //     //       return false;
      //     //     } else return true;
      //     //   });

      //     // check the type
      //     console.log(
      //       "type of the pending list of student",
      //       typeof data.isActive.pendingStatusListOfStu\\dent
      //     );
      //   }

      //   // if (valueSet.selectedStudent) {
      //   // }

      // if(valueSet.filteredArrray){
      //   data.isActive.selectedStudent.feesDetail.
      // }
    };

    const viewPendingList = () => {
      console.log("yha aaya hu check krne ke liye");
    };

    const deleteTheStudentFromPendingQueue = async (id) => {
      console.log(
        "id that need to be delete from pending queue",
        id,
        route.path
      );
      await axios
        .delete("http://localhost:5001/admin/", {
          withCredentials: true,
          crossDomian: true,
          data: {
            id: id,
          },
        })
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });

      // router.replace(route.path);
      // to reload the page
    };

    // return { data, change };
    return {
      data,
      change,
      viewPendingList,
      updateIsActive,
      deleteTheStudentFromPendingQueue,
    };
  },
  components: {
    ButtonToView,
    ContentView,
    LoaderComponent,
    ButtonToView,
    ContentView,
  },
});
</script>

<template>
  <div class="cardWrapper middleTheLoader">
    <div v-if="data.loading"><LoaderComponent /></div>

    <!-- toast for error -->
    <div v-else-if="error">{{ error }}</div>

    <v-card v-else v-for="(value, key) in data.stdList" :key="key">
      <div class="leftSideDetail">
        <b>Name</b>: &emsp;{{ value.Name }} &emsp;&emsp; <b>Branch: &emsp;</b
        >{{ value.branch }} &emsp;&emsp; <b>Batch: &emsp;</b
        >{{ value.batch }} &emsp;&emsp; <b>Pending Status: &emsp;</b
        >{{
          value.feesDetail.feesSubmittedDoc.filter(
            (data) => data.status === "pending"
          ).length
        }}
      </div>
      <v-card-actions>
        <ButtonToView
          @click="viewPendingList"
          :isActive="data.isActive"
          :setItem="value"
          @update:isActive="updateIsActive"
        />
      </v-card-actions>
      <v-card-actions>
        <v-btn color="red" @click="deleteTheStudentFromPendingQueue(value._id)">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- <PendingListMenu /> -->
    <!-- custom dialog  -->
    <div>
      <v-dialog
        fullscreen
        transition="dialog-bottom-transition"
        v-model="data.isActive.value"
      >
        <!-- <ContentView
          v-if="data.isActive.value"
          :isActive="data.isActive"
          @update:isActive="(value) => (data.isActive.value = value)"
        /> -->

        <ContentView
          v-if="data.isActive.value"
          :isActive="data.isActive"
          @update:isActive="updateIsActive"
        />
      </v-dialog>
    </div>
  </div>
</template>

<style scoped>
.v-card {
  display: grid;
  grid-template-columns: auto 6.5rem 6.5rem;
  margin-bottom: 1rem;
  /* justify-content: space-between;
  
  align-items: center; */
}

.leftSideDetail {
  align-self: center;
  /* justify-content: flex-start; */
  justify-self: flex-start;
  padding-left: 2rem;
}
.cardWrapper {
  color: bue;
}

.middleTheLoader {
  text-align: center;
  /* background-color: red; */
}

.v-list-subheader {
  font-size: 1.5rem;
}
</style>
