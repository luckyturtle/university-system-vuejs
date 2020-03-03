<template>
  <div>
    <h1 v-if="isAuth">Welcome</h1>
    <h1 v-if="!isAuth">Anonymus</h1>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data(){
    return {
      isAuth: localStorage.getItem("user") !== null
    }
  },
  // props: {
  //   isAuth: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  created() {
    this.$bus.$on("logged", () => {
      this.isAuth = localStorage.getItem("user") !== null;
    });
  }
};
</script>

<style>
</style>