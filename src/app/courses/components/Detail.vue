<template>
  <v-col cols="12" md="8">
    <v-card flat tile>
      <v-window v-model="onboarding" reverse>
        <v-window-item v-for="course in list" :key="`card-${course._id}`">
          <app-course :course="course"></app-course>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between">
        <v-btn text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="course in list"
            :key="`btn-${course._id}`"
            v-slot:default="{ active, toggle }"
          >
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn text @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  <!-- <app-loader v-else /> -->
</template>

<script>
import AppCourse from './Course';
// import { AppLoader } from '../../shared/components';
import { mapGetters, mapActions } from 'vuex';
import { getCourse, getCourses } from '../+store/course-state';
export default {
  name: 'Detail',
  components: {
    AppCourse
    // AppLoader
  },
  data() {
    return {
      courseId: null,
      list: [],
      onboarding: 0
    };
  },
  computed: {
    ...mapGetters(['course', 'allCourses'])
  },
  methods: {
    ...mapActions([getCourse, getCourses]),
    next() {
      this.onboarding =
        this.onboarding + 1 === this.list.length ? 0 : this.onboarding + 1;
      const { _id } = this.list[this.onboarding];
      this.$router.push(`/courses/${_id}`);
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.list.length - 1 : this.onboarding - 1;
      const { _id } = this.list[this.onboarding];
      this.$router.push(`/courses/${_id}`);
    }
  },
  created() {
    this.courseId = this.$route.params.id;
    this[getCourse]({ id: this.courseId });

    this[getCourses]();
    this.list = this.allCourses;
    this.onboarding = this.allCourses.findIndex(c => c._id === this.courseId);
  }
};
</script>

<style scoped></style>
