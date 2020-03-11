<template>
  <div class="wrraper">
    <v-row align="center" class="card">
      <h2>Create Course</h2>
      <v-form @submit.prevent="create" v-model="valid" class="form">
        <v-text-field v-model="title" :rules="rules" prepend-icon="label" label="Title"></v-text-field>
        <v-text-field
          v-model="duration"
          :rules="rulesDuration"
          prepend-icon="access_alarms"
          label="Duration"
        ></v-text-field>
        <v-file-input v-model="image" label="Image" prepend-icon="mdi-camera" :rules="rules"></v-file-input>
        <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="startDate"
          transition="scale-transition"
          min-width="290px"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              :rules="rules"
              class="mt-3"
              label="Start Date"
              prepend-icon="event"
              dense
              readonly
              hide-details
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.startMenu.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-divider></v-divider>
        <v-container class="actions">
          <v-btn type="submit" :disabled="!valid" color="success" class="mr-4" width="300">Create</v-btn>
        </v-container>
      </v-form>
    </v-row>
  </div>
</template>

<script>
import { http } from "../../shared/services";

export default {
  name: "CourseCreate",

  data() {
    return {
      startMenu: false,
      valid: false,
      title: "",
      duration: "",
      image: null,
      startDate: null,
      rules: [v => !!v || "Field is required"],
      rulesDuration: [
        v => !!v || "Field is required",
        v =>
          (!isNaN(Number(v)) && Number(v) > 0 && Number(v) < 100) ||
          "Value must be number in range 0 - 100"
      ]
    };
  },
  methods: {
    create() {
      const course = {
        title: this.title,
        duration: this.duration,
        startDate: this.startDate,
        image: this.image
      };
      http.post("courses", course).then(() => {
        this.$router.push("/courses");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrraper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  margin-bottom: 10px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  border-radius: 0.5em;
  box-shadow: 0 0 1em gray;
  padding: 40px 50px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.95);
}
</style>



