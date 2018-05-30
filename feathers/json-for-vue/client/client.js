const rigore = document.getElementById('area_di_rigore');

const app = feathers();

const restClient = feathers.rest('http://localhost:3030')

// Configure an AJAX library (see below) with that client 
app.configure(restClient.fetch(window.fetch));

// Connect to the `http://feathers-api.com/messages` service
const client = app.service('json');

client.get('products.json')
  .then(data => rigore.value = JSON.stringify(data));
  
