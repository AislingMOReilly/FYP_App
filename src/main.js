import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import alertComp from "./components/Alert.vue";
import vuetify from "./plugins/vuetify";
import {auth } from "./firebase";
import * as tf from "@tensorflow/tfjs";

Vue.config.productionTip = false;
Vue.component("alert", alertComp);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created () {
    // firebase.auth().onAuthStateChanged((user) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    // this.$store.dispatch('loadMeetups')
  }
}).$mount("#app");
