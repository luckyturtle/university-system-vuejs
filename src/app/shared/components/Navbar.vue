<template>
  <v-app-bar class="navbar" app color="primary" dark height="85">
    <router-link to="/">
      <div class="d-flex align-center">
        <v-img
          alt="University Logo"
          class="shrink mr-4"
          contain
          src="images/university-logo.png"
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
        <span class="mr-4">Profile</span>
      </v-btn>
    </router-link>
    <router-link to="/courses" v-if="isAuth">
      <v-btn text>
        <v-icon>event_note</v-icon>
        <span class="mr-4">Courses</span>
      </v-btn>
    </router-link>
    <router-link class="mr-10" to="/create-course" v-if="isAuth">
      <v-btn text>
        <v-icon>create</v-icon>
        <span class="mr-4">Create Course</span>
      </v-btn>
    </router-link>
    <v-text-field v-model="searchInput" placeholder="Type keyword..."></v-text-field>
    <v-btn class="mr-10" icon @click="search">
      <v-icon>search</v-icon>
    </v-btn>

    <router-link to="/logout" v-if="isAuth">
      <v-btn text @click="logout">
        <v-icon>cancel</v-icon>
        <span class="mr-4">Logout</span>
      </v-btn>
    </router-link>
    <router-link to="/login" v-if="!isAuth">
      <v-btn text>
        <v-icon>person_pin</v-icon>
        <span class="mr-4">Login</span>
      </v-btn>
    </router-link>
    <router-link to="/register" v-if="!isAuth">
      <v-btn text>
        <v-icon>perm_identity</v-icon>
        <span class="mr-4">Register</span>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import { actionTypes as userActionTypes } from "../../auth/auth-state";
import { http } from "../services";

export default {
  name: "Navbar",
  data() {
    return {
      isAuth: this.$store.state.authState.isAuth,
      searchInput: ""
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch(userActionTypes.logoutSuccess);
      this.isAuth = false;
    },
    search() {
      http
        .get(`courses/?query={"title":"${this.searchInput}"}`)
        .then(({ data }) => {
          if (data.length > 0) {
            const course = data[0];
            this.$router.push(`/courses/${course._id}`);
          }
        });
    }
  },
  created() {
    this.$bus.$on("logged", () => {
      this.isAuth = this.$store.state.authState.isAuth;
    });
  }
};
</script>

<style scoped>
.title {
  color: white;
}
.searchInput {
  width: 20px;
}
</style>