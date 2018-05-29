const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

class Messages {
  constructor() {
    this.messages = [],
    this.currentId = 0;
  }

  async find(params) {
    return this.messages;
  }

  async get(id, params) {
    const message = this.messages.find(msg => (msg.id === parseInt(id, 10)));

    if (!message) {
      throw new Error(`Message with id ${id} not found`);
    }

    return message;
  }

  async create(data, params) {
    const message = Object.assign({
      id: ++this.currentId,
    }, data);

    this.messages.push(message);

    return message;
  }
 
  async patch(id, data, params) {
    const message = await this.get(id);

    return Object.assign(message, data);
  }

  async remove(id, params) {
    const message = await this.get(id);

    const index = this.messages.indexOf(message);

    this.messages.splice(index, 1);

    return message;
  }
}

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.configure(express.rest());

app.use('messages', new Messages());
app.use(express.errorHandler());

const server = app.listen(3030);
server.on('listening', () => {console.log('REST API started')});

app.service('messages')
  .create({text: 'Welcome from the server'});


