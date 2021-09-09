import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Layout from './views/Layout.vue'
import Card from './views/Card.vue'
import Item from './views/Item.vue'

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children:[
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          loggedIn: true
        }
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          loggedIn: true
        }
      },
      {
        path: '/cart',
        name: 'card',
        component: Card
      },
      {
        path: '/item/:id',
        name: 'item',
        component: Item,
        props: (route) => ({ id: route.id })
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = to.matched.some(record => record.meta.loggedIn);
  const isAuthenticated = firebase.default.auth().currentUser;
  if (loggedIn && isAuthenticated) {
    router.push("/").catch(()=>{});
  }
  else {
    next();
  }
});

export default router;
