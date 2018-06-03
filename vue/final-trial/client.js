(function(w) {
  'use strict';
  
  const app = feathers();

  const restClient = feathers.rest('http://localhost:3031');
  const auth = feathers.authentication({ storage: localStorage });

  // Configure an AJAX library (see below) with that client 
  app.configure(restClient.fetch(window.fetch))
     .configure(auth);

  // Connect to the `http://feathers-api.com/products` service
  w.usersClient = app.service('users');
  w.productsClient = app.service('products');
  w.feathersClient = app;
  
}(window));

// usersClient.get('413348').then(d => console.log(d));
// productsClient.get('?$skip=1').then(data => console.log(data));
// usersClient.get('?$limit=1').then(d => console.log(d))
/*
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
*/
