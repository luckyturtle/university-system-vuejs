<template>
  <div>
    <Course class="course" />
  </div>
</template>

<script>
import Course from "./Course";
export default {
  name: "CourseList",
  components: {
    Course
  }
};
</script>

<style scoped>
.course {
  margin: 10px 50px;
  border-radius: 1em;
  box-shadow: 0 0 1em gray;
  opacity: 0.9;
}
</style>