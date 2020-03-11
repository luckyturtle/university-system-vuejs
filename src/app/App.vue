<template>
  <v-app class="app">
    <SnackBar />
    <Navbar />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { Navbar } from "./shared/components";
import { Footer } from "./shared/components";
import { SnackBar } from "./shared/components";
export default {
  name: "App",

  components: {
    Navbar,
    Footer,
    SnackBar,
  },

  data() {
    return {};
  }
};
</script>

<style scoped>
.app {
  background-image: url("../../public/images/higher-ed.jpg") !important;
  background-size: cover !important;
}
</style>
