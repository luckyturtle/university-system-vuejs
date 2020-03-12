<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img src="images/university-logo.png" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to
          <br />University System
        </h1>

        <p class="subheading font-weight-regular">
          In this system, you can start to create course then
          <br />add new student to it
        </p>
      </v-col>

      <v-col class="mb-5" cols="12" v-if="isAuth">
        <h2 class="headline font-weight-bold mb-3">Check courses or create new course</h2>
        <v-btn @click="toList" color="primary" class="mr-4" width="300">All Courses</v-btn>
        <v-btn @click="toCreate" color="primary" class="mr-4" width="300">Create Create</v-btn>
        <v-row justify="center"></v-row>
      </v-col>
      <v-col class="mb-5" cols="12" v-else>
        <h2 class="headline font-weight-bold mb-3">Join to out university system</h2>
        <v-btn @click="toLogin" color="primary" class="mr-4" width="300">Login</v-btn>
        <v-btn @click="toRegister" color="primary" class="mr-4" width="300">Register</v-btn>
        <v-row justify="center"></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      isAuth: this.$store.state.authState.isAuth
    };
  },
  methods: {
    toCreate() {
      this.$router.push("/create-course");
    },
    toList() {
      this.$router.push("/courses");
    },
    toLogin() {
      this.$router.push("login");
    },
    toRegister() {
      this.$router.push("register");
    }
  },
  created() {
    this.$bus.$on("logged", () => {
      this.isAuth = this.$store.state.authState.isAuth;
    });
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>