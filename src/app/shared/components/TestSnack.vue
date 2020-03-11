
<template>
  <v-layout>
    <v-flex text-xs-center xs4 offset-xs4>
      <v-text-field label="What snack?" v-model="snackMessage" />
      <v-btn class="primary" @click="snackTime">Test snack</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { actionTypes } from "../shared-state";
export default {
  data() {
    return { snackMessage: "" };
  },
  methods: {
    snackTime: function() {
      this.$store.dispatch(actionTypes.setSnackbarError, { message: this.snackMessage });
    }
  }
};
</script>
