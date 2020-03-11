<template>
  <div>
    <h1 v-if="isAuth">Welcome</h1>
    <h1 v-else>Anonymus</h1>
   
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      isAuth: this.$store.state.authState.isAuth
    };
  },
  // props: {
  //   isAuth: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  created() {
    this.$bus.$on("logged", () => {
      this.isAuth = this.$store.state.authState.isAuth;
    });
  }
};
</script>

<style>
</style>