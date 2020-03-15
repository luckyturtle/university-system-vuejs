<template>
  <v-container v-if="course">
    <Course :course="course" />
  </v-container>
</template>

<script>
import Course from './Course';
import { mapGetters, mapActions } from 'vuex';
import { getCourse  } from '../course-state';
export default {
  name: 'Detail',
  components: {
    Course
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['course'])
  },
  methods: {
    ...mapActions([getCourse])
  },
  created() {
    const id = this.$route.params.id;
    this[getCourse]({ id });
  }
};
</script>

<style scoped></style>
