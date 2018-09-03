// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

//import validate from 'vee-validate'

Vue.use(VueFire);
//Vue.use(validate);

firebase.initializeApp({
  apiKey: "AIzaSyBQwmb80k6ztD6usBuExADwaUfPBM668UU",
  authDomain: "ceep-19f4f.firebaseapp.com",
  databaseURL: "https://ceep-19f4f.firebaseio.com",
  projectId: "ceep-19f4f",
  storageBucket: "ceep-19f4f.appspot.com",
  messagingSenderId: "43585209664"
});

export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
