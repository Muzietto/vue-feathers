(function(w) {
  'use strict';
  
  const app = feathers();

  const restClient = feathers.rest('http://localhost:3030')

  // Configure an AJAX library (see below) with that client 
  app.configure(restClient.fetch(window.fetch));

  // Connect to the `http://feathers-api.com/messages` service
  w.restClient = app.service('json');
  
}(window));
