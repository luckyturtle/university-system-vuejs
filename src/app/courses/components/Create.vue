<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" align="center">
        <v-card width="600" elevation="20">
          <v-card-text>
            <v-form @submit.prevent="create" v-model="valid" class="pa-6">
              <v-col cols="12" md="12" align="center">
                <h2>Create Course</h2>
              </v-col>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="title"
                    :rules="[rules.required]"
                    prepend-icon="label"
                    label="Title"
                  ></v-text-field>
                  <v-text-field
                    v-model="duration"
                    :rules="[rules.required, rules.range]"
                    prepend-icon="access_alarms"
                    label="Duration"
                  ></v-text-field>

                  <v-file-input
                    v-model="image"
                    label="Image"
                    prepend-icon="mdi-camera"
                    :rules="[]"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
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
                        :rules="[rules.required]"
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
                      <v-btn text color="primary" @click="startMenu = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.startMenu.save(startDate)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                  <v-textarea
                    v-model="description"
                    :rules="[rules.required, rules.length(100)]"
                    prepend-icon="comment"
                    label="Description"
                    counter="100"
                    no-resize
                    rows="5"
                    row-height="15"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="12" align="center">
                  <v-divider></v-divider>

                  <v-container class="actions">
                    <v-btn
                      type="submit"
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      width="300"
                      >Create</v-btn
                    >
                  </v-container>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { http } from '../../shared/services';
import { actionTypes as snackbarActionTypes } from '../../shared/shared-state';
import { rules } from '../../shared/services/validators';

export default {
  name: 'Create',

  data() {
    return {
      rules,
      startMenu: false,
      valid: false,
      title: '',
      duration: '',
      image: null,
      startDate: null,
      description: ''
    };
  },
  methods: {
    create() {
      const course = {
        title: this.title,
        duration: this.duration,
        startDate: this.startDate,
        available: true,
        description: this.description,
        image: this.image
      };
      http
        .post('courses', course)
        .then(() => {
          this.$router.push('/courses');
          this.$store.dispatch(snackbarActionTypes.setSnackbarSuccess, {
            message: 'Successfly created course!'
          });
        })
        .catch(err => {
          this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
            message: err.message
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
