var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/phone.html');
});

io.sockets.on('connection', function (socket) {
  setInterval(function(){
   socket.emit('news', { hello: 'world' });
  },5000);
  /*socket.on('my other event', function (data) {
    console.log(data);
  });*/
});