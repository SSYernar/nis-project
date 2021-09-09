<template>
  <div>
    Logged in: 
    <div v-if="loggedIn">Yes</div>
    <div v-else>No</div>
    <button v-if="loggedIn" class="but" @click="signOut">Sign out</button>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Vue from 'vue'
export default {
  name: "top-header",
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.default.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("signed in");
          this.loggedIn = true;
        } 
        else {
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    signOut() {
      firebase
        .default.auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    }
  },
  data() {
    return {
      loggedIn: false
    };
  }
};
</script>

<style scoped>
div {
  color: inherit;
}
</style>