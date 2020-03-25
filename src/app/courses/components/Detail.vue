<template>
  <v-col cols="12" md="8">
    <v-card flat tile>
      <v-window v-model="onboarding" reverse>
        <v-window-item v-for="course in list" :key="`card-${course._id}`">
          <app-table :course="course"></app-table>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between">
        <v-btn :loading="loading" text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="course in list"
            :key="`btn-${course._id}`"
            v-slot:default="{ active, toggle }"
          >
            <v-btn
              :loading="loading"
              :input-value="active"
              icon
              @click="toggle"
            >
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn :loading="loading" text @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  <!-- <app-loader v-else /> -->
</template>

<script>
import AppTable from './Table.vue';
// import { AppLoader } from '../../shared/components';
import { mapGetters, mapActions } from 'vuex';
import { getCourse, getCourses } from '../+store/course-state';
export default {
  name: 'Detail',
  components: {
    AppTable
    // AppLoader
  },
  data() {
    return {
      courseId: null,
      loading: false,
      onboarding: 0
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['course', 'allCourses']),

    list() {
      return this.allCourses || [];
    }
  },
  methods: {
    ...mapActions([getCourse, getCourses]),
    next() {
      this.onboarding =
        this.onboarding + 1 === this.list.length ? 0 : this.onboarding + 1;
      const { _id } = this.list[this.onboarding];
      this.$router.push(`/course/${_id}`);
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.list.length - 1 : this.onboarding - 1;
      const { _id } = this.list[this.onboarding];
      this.$router.push(`/course/${_id}`);
    }
  },
  async created() {
    this.loading = true;
    // this.courseId = this.$route.params.id;
    // await this[getCourse]({ id: this.id });
    await this[getCourses]();
    this.onboarding = this.allCourses.findIndex(c => c._id === this.id);
    this.loading = false;
  }
};
</script>

<style scoped></style>
