<template>
  <v-app class="app">
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

export default {
  name: "App",

  components: {
    Navbar,
    Footer
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
.app {
  background-image: url("../assets/images/higher-ed.jpg") !important;
  background-size: cover !important;
}
</style>
