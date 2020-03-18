<template>
  <v-row>
    <v-app-bar-nav-icon
      class="side-nav"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-row rows="12" md="4" align="center" justify="start" class="ml-4 logo">
      <router-link class="router-link" to="/">
        <div class="d-flex align-center">
          <v-img
            alt="University Logo"
            class="shrink mr-4 logo-img"
            contain
            src="/images/university-logo.png"
            transition="scale-transition"
            width="70"
          />
          <h1 class="title">University System</h1>
        </div>
      </router-link>
    </v-row>
    <div class="main-nav">
      <v-row
        rows="12"
        md="8"
        v-if="isAuth"
        align="center"
        justify="end"
        class="mr-4"
      >
        <router-link class="router-link" to="/profile">
          <v-btn text>
            <v-icon>account_circle</v-icon>
            <span class="mr-4">Profile</span>
          </v-btn>
        </router-link>
        <router-link class="router-link" to="/courses">
          <v-btn text>
            <v-icon>event_note</v-icon>
            <span class="mr-4">Courses</span>
          </v-btn>
        </router-link>
        <router-link class="router-link mr-8" to="/create-course">
          <v-btn text>
            <v-icon>create</v-icon>
            <span class="mr-4">Create Course</span>
          </v-btn>
        </router-link>
        <div class="search-input">
          <v-text-field
            v-model="searchInput"
            placeholder="Type keyword..."
          ></v-text-field>
        </div>
        <v-btn class="mr-6" icon @click="search">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn text @click="logout">
          <v-icon>cancel</v-icon>
          <span class="mr-4">Logout</span>
        </v-btn>
      </v-row>
      <v-row rows="12" md="8" v-else align="center" justify="end">
        <router-link class="router-link" to="/login" v-if="!isAuth">
          <v-btn text>
            <v-icon>person_pin</v-icon>
            <span class="mr-4">Login</span>
          </v-btn>
        </router-link>
        <router-link class="router-link" to="/register" v-if="!isAuth">
          <v-btn text>
            <v-icon>perm_identity</v-icon>
            <span class="mr-4">Register</span>
          </v-btn>
        </router-link>
      </v-row>
    </div>
  </v-row>
</template>

<script>
import { logoutSuccess } from '../../auth/+store/auth-state';
import { http } from '../services';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Navbar',
  data() {
    return {
      searchInput: '',
      drawer: false
    };
  },
  computed: {
    ...mapGetters(['isAuth'])
  },
  watch: {
    drawer(val) {
      this.$emit('onDrawer', val);
    }
  },
  methods: {
    ...mapActions([logoutSuccess]),
    logout() {
      this[logoutSuccess]();
      this.$router.push('/');
    },
    async search() {
      const { data: courses } = await http.get('courses');
      const found = courses.filter(c =>
        c.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );
      this.$store.commit('[COURSE] SEARCH COURSES SUCCESS', found);

      console.log(found);
    }
  }
  // created() {
  //   this.$bus.$on("logged", () => {
  //     this.isAuth = this.$store.state.authState.isAuth;
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.logo .title {
  color: white;
}

@media (max-width: 1200px) {
  .logo .title {
    display: none;
  }
}

@media (max-width: 1024px) {
  .main-nav span {
    font-size: 12px;
  }
  .search-input {
    width: 120px;
  }
}

@media (max-width: 1024px) {
  .main-nav {
    display: none;
  }
  .logo-img {
    position: absolute;
    top: 15%;
    right: 40%;
  }
}
</style>
