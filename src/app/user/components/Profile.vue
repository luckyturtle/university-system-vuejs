<template>
  <v-card class="mx-auto" width="600" elevation="24" tile>
    <v-img
      height="100%"
      src="https://firebasestorage.googleapis.com/v0/b/university-system-dfd77.appspot.com/o/images%2Fbeautiful-harvard-university.jpg?alt=media&token=4d63f166-531d-49e7-af97-3921d8c97bae"
      lazy-src="https://firebasestorage.googleapis.com/v0/b/university-system-dfd77.appspot.com/o/images%2Fbeautiful-harvard-university.jpg?alt=media&token=4d63f166-531d-49e7-af97-3921d8c97bae"
      gradient="to top right, rgba(0,0,0,.33), rgba(25,32,72,.53)"
    >
      <v-row align="start" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12" md="5">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>

          <div class="ml-4">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">Full name:</v-list-item-title>
                <v-list-item-subtitle>Georgi Uzuntonev</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">Email:</v-list-item-title>
                <v-list-item-subtitle
                  >georgi.uzuntonev@gmail.com</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title"
                  >Pnone Number:</v-list-item-title
                >
                <v-list-item-subtitle>555-555-555-55</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item> -->
          </div>
          <div class="mx-10">
            <app-edit-form></app-edit-form>
          </div>
        </v-col>
        <v-col cols="12" md="7">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">Departmant:</v-list-item-title>
              <v-list-item-subtitle
                >Information technology</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">Courses:</v-list-item-title>
              <v-list-item-subtitle>
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Information technology</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Information technology</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Information technology</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import AppEditForm from './EditForm.vue';
export default {
  name: 'Profile',
  components: {
    AppEditForm
  },
  data() {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    };

    return {
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
      ],
      title: 'The summer breeze'
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
