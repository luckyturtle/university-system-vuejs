<template>
  <div class="wrapper">
    <Course class="course" v-for="course in courses" :key="course._id" v-bind:course="course"/>
  </div>
</template>

<script>
import Course from "./Course";
import { http } from "../../shared/services";
export default {
  name: "CourseList",
  components: {
    Course
  },
  data() {
    return {
      courses: null,
      test: 'fsfs'
    };
  },
  created() {
    http.get("courses").then(({ data }) => {
      this.courses = data;
    });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
}
.course {
  width: 900px;
  margin: 10px 50px;
  border-radius: 1em;
  box-shadow: 0 0 1em gray;
  opacity: 0.9;
}
</style>