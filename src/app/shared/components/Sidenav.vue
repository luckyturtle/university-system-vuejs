<template>
  <v-navigation-drawer v-model="drawer" absolute>
    <v-list nav >
      <v-list-item-group v-model="group" active-class="">
        <v-list-item v-if="isAuth">
          <v-list-item-title>
            <div class="search-input">
              <v-text-field
                v-model="searchInput"
                placeholder="Type keyword..."
              ></v-text-field>
            </div>
            <v-btn class="mr-6" icon @click="search">
              <v-icon>search</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAuth">
          <v-list-item-title>
            <router-link to="/profile">
              <v-btn text>
                <v-icon>account_circle</v-icon>
                <span class="mr-4">Profile</span>
              </v-btn>
            </router-link>
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isAuth">
          <v-list-item-title>
            <router-link to="/courses">
              <v-btn text>
                <v-icon>event_note</v-icon>
                <span class="mr-4">Courses</span>
              </v-btn>
            </router-link>
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isAuth">
          <v-list-item-title>
            <router-link to="/create-course" class="mr-8">
              <v-btn text>
                <v-icon>create</v-icon>
                <span class="mr-4">Create Course</span>
              </v-btn>
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAuth">
          <v-list-item-title>
              <v-btn text @click="logout">
                <v-icon>cancel</v-icon>
                <span class="mr-4">Logout</span>
              </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isAuth">
          <v-list-item-title>
            <router-link to="/login">
              <v-btn text>
                <v-icon>person_pin</v-icon>
                <span class="mr-4">Login</span>
              </v-btn>
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isAuth">
          <v-list-item-title>
            <router-link to="/register">
              <v-btn text>
                <v-icon>perm_identity</v-icon>
                <span class="mr-4">Register</span>
              </v-btn>
            </router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Sidenav',
  data() {
    return {
      group: null,
      searchInput: ''
    };
  },
  computed: {
    ...mapGetters(['isAuth'])
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    search() {},
    logout() {}
  }
};
</script>

<style scoped></style>
