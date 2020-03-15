<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" v-for="course in allCourses" :key="course._id">
        <v-card class="mx-auto" width="400" elevation="20">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="course.image"
          ></v-img>
          <v-card-title class="title">
            <div>{{ course.title }}</div>
          </v-card-title>

          <v-card-subtitle
            v-if="course.available"
            :class="{ available: course.available }"
            class="pb-0 d-flex subtitle align-center justify-end"
          >
            <v-icon large color="green darken-2">present_to_all</v-icon>
            <div>Available</div>
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
            <router-link :to="{ path: `courses/${course._id}` }">
              <v-btn color="primary" class="mr-4">View</v-btn>
            </router-link>
            <router-link to="/courses">
              <v-btn
                color="error"
                class="mr-4"
                @click="deleteCourse({ id: course._id })"
                >Delete</v-btn
              >
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getCourses, deleteCourse } from '../course-state';
export default {
  name: 'List',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['allCourses'])
  },
  created() {
    this[getCourses]();
  },
  methods: {
    ...mapActions([getCourses, deleteCourse]),
    deleteCourse(id){
      this[deleteCourse](id)
    }
  }
};
</script>

<style lang="scss" scoped>
.subtitle {
  padding: 5px;
  div {
    padding: 5px;
    font-size: bold;
    color: red;
  }
}
.available {
  div {
    color: #388e3c;
  }
}
.title {
  color: #1976d2;
  font-size: bold;
}
</style>
