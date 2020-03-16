<template>
  <v-app class="app">
    <SnackBar />
    <v-app-bar app color="primary" dark height="85">
      <v-app-bar-nav-icon
        class="side-nav"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <Navbar />
    </v-app-bar>

    <v-content>
      <Sidenav :drawer="drawer" />
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { Navbar, Footer, SnackBar, Sidenav } from './shared/components';

export default {
  name: 'App',

  components: {
    Navbar,
    Sidenav,
    Footer,
    SnackBar
  },

  data() {
    return {
      drawer: false,
    };
  }
};
</script>

<style scoped>
.app {
  background-image: url('../../public/images/higher-ed.jpg') !important;
  background-size: cover !important;
}
@media (min-width: 1024px) {
  .side-nav {
    display: none;
  }
}
@media (max-width: 1024px) {
  .side-nav {
    display: block;
    margin-right: 100px;
  }
}
</style>
