<template>
  <v-container v-if="course._id === courseId">
    <app-course :course="course"></app-course>
  </v-container>
  <!-- <app-loader v-else /> -->
</template>

<script>
import AppCourse from './Course';
// import { AppLoader } from '../../shared/components';
import { mapGetters, mapActions } from 'vuex';
import { getCourse } from '../+store/course-state';
export default {
  name: 'Detail',
  components: {
    AppCourse
    // AppLoader
  },
  data() {
    return {
      courseId: null
    };
  },
  computed: {
    ...mapGetters(['course'])
  },
  methods: {
    ...mapActions([getCourse])
  },
  created() {
    this.courseId = this.$route.params.id;
    this[getCourse]({ id: this.courseId });
  }
};
</script>

<style scoped></style>
