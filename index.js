var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var clientIp = socket.request.connection.remoteAddress;
        clientIp = clientIp.replace(/^.*:/, '');
  console.log('Utilizador ', clientIp, 'ligou-se');

  socket.on('chat message', function(msg){
    io.emit('chat message', clientIp + ': '+ msg);
  });
});

/*io.on("connection", function (socket) {
    var clientIp = socket.request.connection.remoteAddress;
	clientIp = clientIp.replace(/^.*:/, '');
    console.log('eventName',{ip : clientIp}); //emit it back to client
});*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});
