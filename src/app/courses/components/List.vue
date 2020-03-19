<template>
  <v-container>
    <v-row v-if="isFound" align="center" justify="center">
      <div class="font-weight-bold">
        <h1 class="my-10">Not Found Course</h1>

        <router-link to="/create-course" class="router-link">
          <v-btn color="primary" width="250">Create Create</v-btn>
        </router-link>
      </div>
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        md="3"
        v-for="course in searchCourse || allCourses"
        :key="course._id"
      >
        <v-card class="mx-auto" width="400" elevation="20">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="course.imageUrl"
          ></v-img>
          <v-card-title class="font-weight-bold blue--text darken-2">
            <div>{{ course.title }}</div>
          </v-card-title>

          <v-card-subtitle
            v-if="course.available"
            :class="{ available: course.available }"
            class="pb-0 d-flex subtitle align-center font-weight-bold justify-space-between"
          >
            <div class="blue--text darken-2">Start: {{ course.startDate }}</div>
            <div class="green--text darken-2">
              <v-icon large color="green darken-2">present_to_all</v-icon>
              Available
            </div>
          </v-card-subtitle>
          <v-card-subtitle
            v-else
            class="pb-0 d-flex subtitle align-center justify-end"
          >
            <v-icon large color="red darken-2">cancel_presentation</v-icon>
            <div>Closed</div>
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ course.description }}</div>
          </v-card-text>
          <v-card-actions>
            <router-link
              class="router-link"
              :to="{ path: `courses/${course._id}` }"
            >
              <v-btn color="primary" class="mr-4">View</v-btn>
            </router-link>

            <v-btn
              color="error"
              class="mr-4"
              @click="deleteCourse({ id: course._id })"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getCourses, deleteCourse, resetCourses } from '../+store/course-state';
export default {
  name: 'List',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['allCourses', 'searchCourse']),
    isFound() {
      return this.searchCourse !== null && this.searchCourse.length === 0;
    }
  },
  created() {
    this[getCourses]();
  },
  destroyed() {
    this[resetCourses]();
  },
  methods: {
    ...mapActions([getCourses, deleteCourse, resetCourses]),
    deleteCourse(id) {
      this[deleteCourse](id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
