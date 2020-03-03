<template>
  <v-app-bar class="navbar" app color="primary" dark height="85">
    <router-link to="/">
      <div class="d-flex align-center">
        <v-img
          alt="University Logo"
          class="shrink mr-2"
          contain
          src="../../../assets/images/university-logo.png"
          transition="scale-transition"
          width="70"
        />
        <h1 class="title">University System</h1>
      </div>
    </router-link>

    <v-spacer></v-spacer>
    <router-link to="/profile" v-if="isAuth">
      <v-btn text>
        <v-icon>account_circle</v-icon>
        <span class="mr-2">Profile</span>
      </v-btn>
    </router-link>
    <router-link to="/courses" v-if="isAuth">
      <v-btn text>
        <v-icon>event_note</v-icon>
        <span class="mr-2">Courses</span>
      </v-btn>
    </router-link>
    <router-link to="/create-course" v-if="isAuth && isTeacher">
      <v-btn text>
        <v-icon>create</v-icon>
        <span class="mr-2">Create Course</span>
      </v-btn>
    </router-link>
    <router-link to="/logout" v-if="isAuth" >
      <v-btn text @click="logout">
        <v-icon>cancel</v-icon>
        <span class="mr-2">Logout</span>
      </v-btn>
    </router-link>
    <router-link to="/login" v-if="!isAuth">
      <v-btn text>
        <v-icon>person_pin</v-icon>
        <span class="mr-2">Login</span>
      </v-btn>
    </router-link>
    <router-link to="/register" v-if="!isAuth">
      <v-btn text>
        <v-icon>perm_identity</v-icon>
        <span class="mr-2">Register</span>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isAuth: localStorage.getItem("user") !== null,
      isTeacher: JSON.parse(localStorage.getItem('user'))?.position === 'Teacher'
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isAuth = false;
    }
  },
  created() {
    this.$bus.$on("logged", () => {
      this.isAuth = localStorage.getItem("user") !== null;
      this.isTeacher = JSON.parse(localStorage.getItem('user'))?.position === 'Teacher';
    });
  }
};
</script>

<style scoped>
.title {
  color: white;
}
</style>