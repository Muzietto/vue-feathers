const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const memory = require('feathers-memory');
const jsonData = require('./test_file.json');
console.log(jsonData.messages);

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.configure(express.rest());

app.use(express.errorHandler());
app.use(myLogger);

app.use('/messages', memory({
  paginate: {
    default: 10,
    max: 25,
  },
}));

app.service('messages').hooks({
  error: async context => {
    console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
  },
  before: {
    create: [addCreatedAt, validate],
    update: [validate],
    patch: [validate],
  }});

async function addCreatedAt(context) {
  context.data.createdAt = new Date();
  return context;
}

async function validate(context) {
  const {data} = context;

  if (!data.text) {
    throw new Error('messsage text must be provided');
  }
  return context;
}

const server = app.listen(3051)
  .on('listening', () => {console.log('REST API started at 3051')});

jsonData.messages.forEach(msg => {
  loadMessage(msg);
});

async function loadMessage(msg) {
  await app.service('messages')
           .create(msg);
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
