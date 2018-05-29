const feathers = require('@feathersjs/feathers');
const app = feathers();

app.use('todos', {
  async get(name) {
    return {
      name,
      text: `You have to do ${name}`,
    };
  }
});

async function getTodo(name) {
  // Get the service we registered above
  const service = app.service('todos');
  // Call the `get` method with a name
  const todo = await service.get(name);

  // Log the todo we got back
  console.log(todo);
}

getTodo('dishes');

