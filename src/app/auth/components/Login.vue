<template>
      <v-col cols="12" md="12" align="center">
        <v-card class="pa-8" elevation="20" width="600">
          <v-card-title class="d-flex justify-center">
            <h2>
              Login
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" v-model="valid" ref="loginForm">
              <v-text-field
                prepend-icon="account_box"
                v-model="username"
                :rules="[rules.required('Username'), rules.max(10)]"
                label="Username"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-model="password"
                name="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required('Password'), rules.min(6)]"
                :type="show ? 'text' : 'password'"
                label="Password"
                value
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
              <v-container class="actions">
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  width="200"
                  >Login</v-btn
                >
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center ">
            <span class="mr-4">
              Don't have an account?
            </span>
            <router-link to="/register">Register</router-link>
          </v-card-actions>
        </v-card>
      </v-col>
</template>

<script>
import { http, rules } from '../../shared/services';
import { loginSuccess } from '../+store/auth-state';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      rules,
      valid: true,
      show: false,
      checkbox: false,
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions([loginSuccess]),
    async login() {
      const { data } = await http.post('login', {
        username: this.username,
        password: this.password
      });

      this[loginSuccess](data);
      this.$router.push('/');
      // this.$bus.$emit('logged', 'User logged');
    }
  }
};
</script>

<style scoped></style>
