<template>
   <v-app>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                          <v-text-field
                            prepend-icon="person"
                            v-model="email"
                            required
                            name="login"
                            label="Email"
                            type="text"
                          ></v-text-field>
                          <v-text-field
                            required
                            prepend-icon="lock"
                            v-model="password"
                            name="password"
                            label="Password"
                            type="password"
                          ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-layout justify-center>
                       <v-alert
                          v-if="error"
                          type="error"
                          dense
                          outlined
                          max-width="80%"
                        >
                          {{error}}
                        </v-alert>
                      </v-layout>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="pressed" color="primary">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>


<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import * as firebase from "firebase/app"
require('firebase/auth')

export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    }
  },
  methods: {
    pressed() {
      firebase
        .default.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          localStorage.setItem('loggedIn', 1);
          this.$router.replace({ name: "home" })
        })
        .catch(error => {
          this.error = error.message
        })
    }
  },
  watch: {
    email(val) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(val).toLowerCase())) {
        this.error = "Email is not valid!";
      }
      else {
        this.error = "";
      }
    },
    password(val) {
      if (val.length < 5) {
        this.error = "Password is too short";
      }
      else {
        this.error = "";
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 500px
}

</style>