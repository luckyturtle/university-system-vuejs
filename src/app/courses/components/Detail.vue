<template>
  <v-container>
    <Course v-if="course" v-bind:course="course" />
  </v-container>
</template>

<script>
import Course from "./Course";
import { http } from "../../shared/services";
import { actionTypes as snackbarActionTypes } from "../../shared/shared-state";
export default {
  name: "Detail",
  components: {
    Course
  },
  data() {
    return {
      course: null
    };
  },
  created() {
    const id = this.$route.params.id;

    http
      .get(`courses/?query={"_id":"${id}"}`)
      .then(({ data }) => {
        this.course = data[0];
      })
      .catch(err => {
        this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
          message: err.message
        });
      });
  }
};
</script>

<style>
</style>