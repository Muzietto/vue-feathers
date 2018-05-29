const socket = io('http://localhost:3032');
const rigore = document.getElementById('area_di_rigore');

socket.on('messages created', message =>
  console.log('Someone created a message', message)
);

socket.emit('create', 'messages', {
  text: 'Hello from socket'
}, (error, result) => {
  if (error) throw error
  socket.emit('find', 'messages', (error, messageList) => {
    if (error) throw error
    console.log('Current messages', messageList);
  });
});

socket.cippa = messio => {
  socket.emit('create', 'messages', {
    text: messio,
  }, (error, result) => {
    if (error) throw error;
    socket.emit('find', 'messages', (error, messageList) => {
      if (error) throw error;
      console.log('Current messages', messageList);
    });
  });
};

socket.on('messages created', msg => {
  rigore.value = JSON.stringify(msg);
});
