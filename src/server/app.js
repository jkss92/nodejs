var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  app.use('/public',express.static(__dirname + '/public'));

//ignore call http server twice at node.js
  if (req.url == '/favicon.ico') {
    r.writeHead(200, {'Content-Type': 'image/x-icon'} );
    r.end();
    console.log('favicon requested');
    return;
  };

  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat', function(msg){
  io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
