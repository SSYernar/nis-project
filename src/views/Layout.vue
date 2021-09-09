<template>
  <v-app>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-toolbar-title
        style="width: 350px"
        >
        <router-link to="/" class="white--text" style="text-decoration: none"><v-icon>mdi-truck</v-icon>&nbsp;Kiim</router-link>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      /> -->
      <v-spacer />
      
      <v-btn v-if="online == 0" text class="white--text" to="/login">
        Login
      </v-btn>
      <v-btn v-if="online == 0" text class="white--text" to="/register">
        Sign Up
      </v-btn>
      <v-btn v-if="online == 1" text class="white--text" @click="signOut">
        Sign Out
      </v-btn>
      <router-link to="/cart" tag="v-btn">
      <!-- <v-btn icon> -->
        <v-badge
          content=""
          value=""
          color="green"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      <!-- </v-btn> -->
      </router-link>
    </v-app-bar>
    <v-main>
      <v-bottom-navigation
        :value="activeBtn"
        color="primary"
        horizontal
      >
        <router-link v-on="on" to="/" class="v-btn">
          <span>Home</span>
        </router-link>
        <!-- <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              <span>Shop</span>
            </v-btn>
          </template>
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              href="#"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

          </v-card>
        </v-menu> -->
        <!-- <router-link v-on="on" to="/" class="v-btn">
          <span>About</span>
        </router-link> -->
      </v-bottom-navigation>
    </v-main>
      <router-view/>
    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="secondary white--text text-center"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Kiim</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";

  export default {
    data () {
      return {
        items: [
          { title: 'T-Shirts' },
          { title: 'Jackets' },
          { title: 'Shirts' },
          { title: 'Jeans' },
          { title: 'Shoes' },
        ],
        activeBtn: 1,
        online: 0
      }
    },
    methods: {
      signOut() {
        firebase
          .default.auth()
          .signOut()
          .then(() => {
            this.online = 0;
          });
      }
    },
    created() {
      firebase.default.auth().onAuthStateChanged(user => {
        if (user) {  
          this.online = 1;
        } 
        else { 
          this.onlne = 0;
        } 
      });
    }
  }
</script>