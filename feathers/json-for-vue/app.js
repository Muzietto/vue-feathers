const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const bodyParser = require('body-parser');
const feathersFs = require('feathers-fs');

var path = require('path');
var appDir = path.dirname(require.main.filename);
console.log('app running in ', appDir);

const app = express(feathers());

// Enable CORS - https://github.com/feathersjs/docs/blob/master/guides/basics/clients.md#rest-client
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.configure(express.rest());

app.use(express.errorHandler());


  // Initialize your feathers plugin
app.use('/json', feathersFs({
    root: appDir + '/src',
    type: 'json' // the default value.
  }));

const dataToStore = [
  {
    to: 'marshall',
    from: 'marshall',
    body: 'Stop talking to that rubber ducky!'
  }, {
    to: 'marshall',
    from: 'marshall',
    body: `...unless you're rubber duck debugging.`
  }
];

async function giraLaGiostra() {
// Store the data at `/src/messages.seed.json`
console.log('partire');
await app.service('/json').create({
  path: '/messages.seed.json', // path will be appended to the `root` path.
  data: dataToStore
})

// Retrieve the data at the provided path.
app.service('/json').get('products.seed.json')
  .then(data => {
      console.log('data=', data);
  });
console.log('moririre');
}

function giraLaGiostraPromessa() {
console.log('partire');
app.service('/json').get('/products.json').then(data => {
  console.log('data2=', data);
});

}

//giraLaGiostra();
//giraLaGiostraPromessa();

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');


