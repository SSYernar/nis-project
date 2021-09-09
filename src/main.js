import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import firebase from "firebase/app"
import vuetify from './plugins/vuetify';

Vue.prototype.$axios = axios
Vue.prototype.$card = []
Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: "AIzaSyCEWd-o5d_eZgfM7aw7AP0Q4-VXM5vn09Q",
    authDomain: "nis-project-b634f.firebaseapp.com",
    projectId: "nis-project-b634f",
    storageBucket: "nis-project-b634f.appspot.com",
    messagingSenderId: "410094503604",
    appId: "1:410094503604:web:6ab7b6b0333eba5533f9e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      components: { App },
      template: '<App/>',
      render: h => h(App)
    }).$mount("#app");
  }
});