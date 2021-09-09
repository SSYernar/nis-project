<template>
   <v-app>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Sign Up form</v-toolbar-title>
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
                          <v-text-field
                            required
                            prepend-icon="lock"
                            v-model="password2"
                            name="password"
                            label="Repeat password"
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
                        <v-btn @click="pressed" color="primary">Sign Up</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>


<script>
	import Vue from 'vue'
	import * as firebase from "firebase/app"
	require('firebase/auth')
	export default {
		methods: {
			pressed() {
				if (this.password !== this.password2) {
					this.error = "Passwords do not match!"
					return;
				}
				firebase
					.default.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.then(() => {
						localStorage.setItem('loggedIn', 1);
						this.$router.replace({ name: "home" })
					})
					.catch(error => (this.error = error.message))
			}
		},
		data() {
			return {
				email: '',
				password: '',
				password2: '',
				error: ''
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
	    	if (val !== this.password2) {
	      	this.error = "Passwords do not match!"
	      }
	      if (val.length < 6) {
	        this.error = "Password is too short!";
	      }
	      else {
	        this.error = "";
	      }
	    },
	    password2(val) {
	    	if (val !== this.password) {
	      	this.error = "Passwords do not match!"
	      }
	      if (val.length < 6) {
	        this.error = "Password is too short!";
	      }
	      else {
	        this.error = "";
	      }
	    }
	  }
	}
</script>

<style scoped>
	.error {
		color: red;
		font-size: 18px;
	}
	input {
		width: 400px;
		padding: 30px;
		margin: 20px;
		font-size: 21px;
	}
	button {
		width: 400px;
		height: 75px;
		font-size: 100%;
	}
</style>