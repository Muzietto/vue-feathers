const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const memory = require('feathers-memory');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');

const jsonProducts = require('./assets/json/products_users.json').products;
const jsonUsers = require('./assets/json/products_users.json').users;

const app = express(feathers());

// Enable CORS - https://github.com/feathersjs/docs/blob/master/guides/basics/clients.md#rest-client
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.configure(express.rest());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.configure(auth({ secret: 'supersecret' }));
app.configure(local());
app.configure(jwt());
// .use('/', feathers.static(__dirname + '/public'))

app.use(express.errorHandler());
app.use(myLogger);

app.use('users', memory());
app.use('products', memory({
  paginate: {
    default: 10,
    max: 25,
  },
}));

app.service('products').hooks({
  error: async context => {
    console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
  },
  before: {
    create: [addCreatedAt, validateProductAtCreation],
    update: [validateProduct],
    patch: [validateProduct]
  },
  after: {
    get: [filterProductByUser]
  }});

app.service('users').hooks({
  error: async context => {
    console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
  },
  before: {
    find: [auth.hooks.authenticate('jwt')],
    create: [
      addCreatedAt, 
      local.hooks.hashPassword({ passwordField: 'password' }),
      validateUserAtCreation, 
    ],
    update: [],
    patch: [],
  },
  after: {
    find: [local.hooks.protect('password'), filterUsersByUser], 
    get: [local.hooks.protect('password'), filterUsersByUser],
  }});

app.service('authentication').hooks({
 before: {
  create: [
   // You can chain multiple strategies
   auth.hooks.authenticate(['jwt', 'local'])
  ],
  remove: [
   auth.hooks.authenticate('jwt')
  ]
 }
});

async function addCreatedAt(context) {
  context.data.createdAt = new Date();
  return context;
}

async function validateProductAtCreation(context) {
  const {data} = context;

  if (!data.title) {
    throw new Error('product title must be provided');
  }

  data.id = Math.floor(Math.random() * 1000000);
  data.description = data.description || data.title;
  data.price = data.price || 100;
  data.availableInventory = data.availableInventory || 100;
  data.rating = data.rating || 2;
  
  return context;
}

async function validateUserAtCreation(context) {
  const {data} = context;

  console.log('new user', data);

  if (!data.name || !data.role || !data.password || !data.email) {
    throw new Error('username+role+email+password must be provided');
  }

  data.id = Math.floor(Math.random() * 1000000);
  data.image = data.image || '/assets/images/placeholder.jpg';

  return context;
}

async function validateProduct(context) {
  const {data} = context;

  if (!data.id || !data.title) {
    throw new Error('product id+title must be provided');
  }
  data.description = data.description || data.title;
  data.price = data.price || 100;
  data.availableInventory = data.availableInventory || 100;
  data.rating = data.rating || 2;

  return context;
}

async function filterProductByUser(productsContext) {
  // use jsonUsers/jsonProducts here
  const {data} = productsContext;
  return productsContext;
}

async function filterUsersByUser(usersContext) {
  // use jsonUsers/jsonProducts here
  const {data} = usersContext;
  return usersContext;
}

const server = app.listen(3031)
  .on('listening', () => {console.log('REST API started at 3031')});

jsonProducts.forEach(obj => {
  loadProduct(obj);
});
jsonUsers.forEach(obj => {
  loadUser(obj);
});

async function loadProduct(obj) {
  await app.service('products')
           .create(obj);
}

async function loadUser(obj) {
  await app.service('users')
           .create(obj);
}

function myLogger(req, res, next) {
    console.log("request content:", {
    baseUrl: req.baseUrl,
    originalUrl: req.originalUrl,
      body: req.body,
      feathers: req.feathers,
      params: req.params,
      query: req.query,
      pathname: req._parsedUrl.pathname,
      search: req._parsedUrl.search,
    });
    next(); // Passing the request to the next handler in the stack.
}

// sample requests (https://docs.feathersjs.com/api/databases/querying.html)
// localhost:3031/messages?$limit=2
// localhost:3031/messages?$skip=1
// localhost:3031/messages?text=Hello
// localhost:3031/messages?$gt=1&$lt=3
// curl localhost:3031/messages -H 'Content-Type:application/json' --data '{"text": "ciao da marco curlo"}'
