const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');

const app = feathers();

app.use('messages', memory({
  paginate: {
    default: 10,
    max: 25,
  },
}));

async function createAndFind() {
  const messages = app.service('messages');
  
  for (let counter = 0; counter < 100; counter++) {
    await messages.create({counter, message: `Message number ${counter}`});
  }
  
  // $limit:10 entries by default
  const page2 = await messages.find({query: {$skip: 10}});
  
  console.log('Page number 2', page2);
  
  const largePage = await messages.find({query: {$limit: 20}});

  console.log('20 items', largePage);
  
  const betw50and70 = await messages.find({query: {$gt: 50, $lt: 70}});
  
  console.log('10 items 50->70', betw50and70);
 
  const msg20 = await messages.find({query: {message: 'Message number 20'}});
  
  console.log('item with given text', msg20);
}

createAndFind();

