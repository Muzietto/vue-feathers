const feathers = require('@feathersjs/feathers');
const {BadRequest} = require('@feathersjs/errors');

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

function addCreatedAt(hook, next) {
  const payload = hook.data;
  payload.createdAt = new Date().getTime();
  next();
}

async function addCreatedAt2(context) {
  context.data.createdAt2 = new Date();
  return context;
}

async function validate(context) {
  const {data} = context;

  if (!data.text) {
    throw new BadRequest('messsage text must be provided');
  }
  return context;
}

const app = feathers();

app.use('messages', new Messages());

app.service('messages').hooks({
  error: async context => {
    console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
  },
  before: {
    create: [addCreatedAt, validate],
    update: [validate],
    patch: [validate],
  }});

async function processMessages() {
  const mess = app.service('messages');

//  mess.on('created', msg => {console.log('CREATED', msg)});
//  mess.on('removed', msg => {console.log('REMOVED', msg)});

  await app.service('messages')
    .create({text: 'first message'});
  await app.service('messages')
    .create({text: 'second message'});

  const messageList = await app.service('messages').find();

  console.log('Available messages', messageList);

  await app.service('messages')
    .patch(1, {text: 'first beautiful message'});
  await app.service('messages')
    .create({text:'qwe'});

  console.log('Available messages', messageList);

  await app.service('messages')
    .remove(1);

  console.log('Available messages', messageList);
}

processMessages();

