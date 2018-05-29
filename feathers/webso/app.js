const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const memory = require('feathers-memory');

// Create a Feathers application
const app = express(feathers());
// Turn on JSON body parsing for REST services
app.use(express.json())
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());
// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());

// Configure the Socket.io transport
app.configure(socketio());

app.on('connection', connection => app.channel('everybody').join(connection));

app.publish(() => app.channel('everybody'));

app.use('messages', memory({
  paginate: {
    default: 10,
    max: 25
  }
}));

// Start the server on port 3032
app.listen(3032);

