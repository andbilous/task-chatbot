var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    messages = [],
    sockets = [];
    users = [];
    let userCount =0;
app.use( express.static(__dirname + '/public'));

server.listen(4000);

function receiveAnswer(text){
  const defaultMessage= "Hi I am Bot. Ask me something";

  return defaultMessage;
}

io.sockets.on('connection', function (socket) {
sockets.push(socket);
    socket.emit('messages-available', messages);
    socket.emit('users-available', users);
    socket.on('add-message', function (data) {
        if(messages.length==100){
            messages.shift();
        }
        messages.push(data);
        sockets.forEach(function (socket) {
            socket.emit('message-added', data);
        });
    });
    socket.on('add-user',function(data){
        users.push(data);
        sockets.forEach(function (socket) {
            socket.emit('user-added', data);
        });
    });
    socket.on('bot', (text) => {
    let answer = receiveAnswer(text);
    if (answer) {
      socket.emit('add-message', function(answer));
    }
  });
});
