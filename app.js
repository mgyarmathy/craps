var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000;


server.listen(port);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/phone.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('roll', function (data) {
    io.sockets.emit('roll', {text: 'rolled dice'});
  });
});