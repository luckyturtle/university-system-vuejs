<template>
  <div class="wrraper">
    <v-row align="center" class="card">
      <h2>Login</h2>
      <v-form @submit.prevent="login" v-model="valid" ref="loginForm">
        <v-text-field v-model="username" :rules="usernameRules" label="Username"></v-text-field>
        <v-text-field
          v-model="password"
          name="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRulse.required, passwordRulse.min]"
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
          <v-btn type="submit" :disabled="!valid" color="success" class="mr-4" width="300">Login</v-btn>
        </v-container>
        <v-divider></v-divider>
      </v-form>
      <p class="text">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </v-row>
  </div>
</template>

<script>
import { http } from "../../shared/services";
import { actionTypes as snackbarActionTypes } from "../../shared/shared-state";
import { actionTypes as userActionTypes } from "../../auth/auth-state";

export default {
  name: "Login",
  data() {
    return {
      valid: true,
      show: false,
      checkbox: false,

      username: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 10) || "Username must be less than 10 characters"
      ],
      password: "",
      passwordRulse: {
        required: v => !!v || "Password is required.",
        min: v => v.length >= 6 || "Min 6 characters"
      }
    };
  },
  methods: {
    login() {
      http
        .post("login", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("authtoken", data._kmd.authtoken);
          this.$store.dispatch(userActionTypes.loginSuccess, {
            userInfo: data,
            authtoken: data._kmd.authtoken,
            isAuth: true
          });
          this.$bus.$emit("logged", "User logged");
          this.$router.push("/");
          this.$store.dispatch(snackbarActionTypes.setSnackbarSuccess, {
            message: "Success Login"
          });
        });
    }
  }
};
</script>

<style scoped>
.actions {
  margin-bottom: 15px;
}
.text {
  margin-top: 15px;
}
.wrraper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  border-radius: 0.5em;
  box-shadow: 0 0 1em gray;
  padding: 40px 50px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.95);
}
h2 {
  margin-bottom: 40px;
}
</style>