import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './routes';
//require('../assets/css/app.css');

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});
 
Vue.config.productionTip = false;
debugger;
feathersClient.authenticate({
  strategy: 'local',
  email: 'adam@admin.com',
  password: 'adam'
})
.then(response => {
  console.log('Authenticated!', response);
  return feathersClient.passport.verifyJWT(response.accessToken);
})
.then(payload => {
  console.log('JWT Payload', payload);
  return feathersClient.service('users').get(payload.userId);
})
.then(user => {
  feathersClient.set('user', user);
  console.log('User', feathersClient.get('user'));
})
.catch(function(error){
  console.error('Error authenticating!', error);
});

/* eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

*/

