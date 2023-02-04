<script>
export default {
  props: {
    userFees: {
      feesSubmittedDoc: {
        type: Array,
      },
    },
  },

  data() {
    return {
      // by default taking the first card as selected
      selectedCardNum: 0,
      userFeesDocList: [],
      detailsToUse: {
        imgSrc: "",
        feesAmount: 0,
        status: "",
        _id: "",
      },
    };
  },

  watch: {
    userFees(newValue) {
      this.userFeesDocList = newValue.feesSubmittedDoc;
      this.detailsToUse.imgSrc = newValue.feesSubmittedDoc[0].doc_url;
      this.detailsToUse.feesAmount = newValue.feesSubmittedDoc[0].feesAmount;
      this.detailsToUse.status = newValue.feesSubmittedDoc[0].status;
      this.detailsToUse._id = newValue.feesSubmittedDoc[0]._id;
    },
  },
  methods: {
    btnClick(actionType) {
      if (
        actionType === "increase" &&
        this.userFees.feesSubmittedDoc.length > this.selectedCardNum + 1
      ) {
        this.selectedCardNum++;
      } else if (actionType === "decrease" && this.selectedCardNum > 0) {
        this.selectedCardNum--;
      }

      this.detailsToUse.imgSrc =
        this.userFeesDocList[this.selectedCardNum].doc_url;
      this.detailsToUse.feesAmount =
        this.userFeesDocList[this.selectedCardNum].feesAmount;
      this.detailsToUse.status =
        this.userFeesDocList[this.selectedCardNum].status;
      this.detailsToUse._id = this.userFeesDocList[this.selectedCardNum]._id;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="upper">
      <div class="leftButton" @click="btnClick('decrease')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15,13h-3.6l1.3,1.3c0.4,0.4,0.4,1,0,1.4
	c-0.4,0.4-1,0.4-1.4,0l-3-3c-0.4-0.4-0.4-1,0-1.4c0,0,0,0,0,0l3-3c0.4-0.4,1-0.4,1.4,0c0,0,0,0,0,0c0.4,0.4,0.4,1,0,1.4c0,0,0,0,0,0
	L11.4,11H15c0.6,0,1,0.4,1,1S15.6,13,15,13z"
          />
        </svg>
      </div>
      <div class="rightButton" @click="btnClick('increase')">
        <svg
          class="btnbackground"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10C22,6.5,17.5,2,12,2z M15.7,12.7C15.7,12.7,15.7,12.7,15.7,12.7
	l-3,3c-0.4,0.4-1,0.4-1.4,0c0,0,0,0,0,0c-0.4-0.4-0.4-1,0-1.4c0,0,0,0,0,0l1.3-1.3H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h3.6l-1.3-1.3
	c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3,3C16.1,11.7,16.1,12.3,15.7,12.7z"
          />
        </svg>
      </div>
      <v-img class="bg-white full" :src="this.detailsToUse.imgSrc" contain>
      </v-img>
    </div>
    <div class="lower">
      <div class="lowerLeft centerTheContent">
        <div>Fee Amount</div>
        <div>{{ this.detailsToUse.feesAmount }}</div>
      </div>
      <div class="lowerRight centerTheContent">
        <div>Status</div>
        <div>{{ this.detailsToUse.status }}</div>
      </div>
    </div>
    <div class="containerFooter centerTheContent">
      {{ selectedCardNum + 1 }}
    </div>
  </div>
</template>

<style scoped>
.btn {
  height: 3rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.leftButton,
.rightButton {
  z-index: 1000;
  background-color: white;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.centerTheContent {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.leftButton {
  top: 50%;
  left: 0;
  margin-left: 1rem;
}
.rightButton {
  top: 50%;
  right: 0;
  margin-right: 1rem;
}
.container {
  /* margin: 1rem; */
  /* background-color: red; */
  height: 100%;
  display: flex;
  flex-direction: column;

  /* overflow-y: scroll; */
}

.full {
  width: 100%;
  height: 100%;
}

.upper {
  height: 95%;
  width: 100%;
  position: relative;
}

.lower {
  height: 15%;
  background-color: rgba(135, 253, 135, 0.551);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  bottom: 5%;
}
.containerFooter {
  width: 100%;
  height: 5%;
  background-color: black;
  color: white;
}

.lowerRight,
.lowerLeft {
  width: calc(100% / 2);
}

.lowerRight div,
.lowerLeft div {
  text-align: center;
  overflow-wrap: break-word;
}
/* .v-window {
  height: 100% !important;
} */
</style>
