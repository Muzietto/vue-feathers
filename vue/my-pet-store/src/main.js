import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './routes';
require('../assets/css/app.css');

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});
 
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

