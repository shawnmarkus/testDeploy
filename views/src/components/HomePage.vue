<script>
export default {
  props: {
    userData: {
      type: Object,
    },
  },
};
</script>

<template>
  <div class="Details">
    <div class="titleName">
      <h1>{{ this.userData.Name }}</h1>
    </div>

    <div class="svg-container">
      <div>
        <div>RollNumber : {{ this.userData.RollNumber }}</div>
        <div>ContactNumber : {{ this.userData.contactNumber }}</div>
        <div>Branch : {{ this.userData.branch }}</div>
        <div>Batch : {{ this.userData.batch }}</div>
        <div>Email : {{ this.userData.email }}</div>
        <div>Address : {{ this.userData.address }}</div>
      </div>
      <svg
        width="6rem"
        height="6rem"
        viewBox="0 0 512 512"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title>user-filled</title>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="icon"
            fill="#000000"
            transform="translate(85.333333, 42.666667)"
          >
            <path
              class="path"
              d="M170.666667,170.666667 C217.794965,170.666667 256,132.461632 256,85.3333333 C256,38.2050347 217.794965,7.10542736e-15 170.666667,7.10542736e-15 C123.538368,7.10542736e-15 85.3333333,38.2050347 85.3333333,85.3333333 C85.3333333,132.461632 123.538368,170.666667 170.666667,170.666667 Z M213.333333,213.333333 L128,213.333333 C57.307552,213.333333 1.42108547e-14,270.640885 1.42108547e-14,341.333333 L1.42108547e-14,426.666667 L341.333333,426.666667 L341.333333,341.333333 C341.333333,270.640885 284.025781,213.333333 213.333333,213.333333 Z"
              id="user"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.Details {
  /* width: 70%;
  height: calc(calc(100% - 1rem) / 2); */
  width: 95%;
  height: 95%;
  padding: 0rem 2rem 0 2rem;
  border-radius: 1rem;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 15px #ffffff;
  /* overflow-y: scroll; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titleName {
  border-bottom: 1px solid black;
  /* margin-bottom: 1.5rem; */
}
.svg-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  /* z-index: 10; */
  padding: 1rem;
}

.titleName h1 {
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  font-weight: 700;
}

::-webkit-scrollbar {
  width: 0.4em;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #797979c0;
}
</style>
