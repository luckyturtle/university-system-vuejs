<template>
  <div class="wrraper">
    <v-row align="center" class="card">
      <h2>Register From</h2>
      <v-form @submit.prevent="register" ref="registerForm" v-model="valid">
        <v-container class="d-flex justify-space-between">
          <v-container class="mr-6">
            <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
            <v-text-field
              v-model="password"
              name="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRulse.required, passwordRulse.min]"
              :type="showPass ? 'text' : 'password'"
              label="Password"
              class="input-group--focused"
              @click:append="showPass = !showPass"
            ></v-text-field>

            <v-text-field
              v-model="rePassword"
              name="password"
              :append-icon="showRepeatPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRulse.required, passwordRulse.min]"
              :type="showRepeatPass ? 'text' : 'password'"
              label="Repeat Password"
              class="input-group--focused"
              @click:append="showRepeatPass = !showRepeatPass"
            ></v-text-field>
          </v-container>
          <v-container>
            <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
            
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>
          </v-container>
        </v-container>

        <v-container class="d-flex justify-space-between actions">
          <v-btn type="submit" :disabled="!valid" color="success" class="mr-4" width="300">Register</v-btn>
          <v-btn color="error" class="mr-4" @click="reset" width="100">Reset</v-btn>
        </v-container>
        <v-divider></v-divider>
      </v-form>
      <p class="text">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </v-row>
  </div>
</template>

<script>
import { http } from "../../shared/services/httpClient";
import { setSnackbarSuccess } from "../../shared/+store/snackbar-state";
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      checkbox: false,
      showRepeatPass: false,
      showPass: false,
      name: "",
      nameRules: [
        v => !!v || "Name is required"
        // v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      password: "",
      rePassword: "",
      passwordRulse: {
        required: v => !!v || "Password is required.",
        min: v => (v && v.length >= 6) || "Min 6 characters"
      },
      username: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 10) || "Username must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      items: ["Teacher", "Student"]
    };
  },
  methods: {
    register() {
      const user = {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email
      };
      http.post("", user).then(() => {
        this.$router.push("/login");
        this.$store.dispatch(setSnackbarSuccess, {
          message: "Success Register"
        });
      });
    },
    reset() {
      this.$refs.registerForm.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.actions {
  margin-bottom: 15px;
}
.text {
  margin-top: 20px;
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