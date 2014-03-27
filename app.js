var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000;

/* Web Server Stuff */
server.listen(port);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/phone.html');
});

app.get('/splash', function (req, res) {
  res.sendfile(__dirname + '/splash.html');
});

app.get('/game', function (req, res) {
  res.sendfile(__dirname + '/game.html');
});

/* Craps Game Stuff */

function Table(id) {
  this.id = id;
  this.players = [];
  this.addPlayer = function(p) {
    this.players.push(p)
  };
  this.removePlayer = function(name) {
    for(var i = this.players.length - 1; i >= 0; i--) {
      if (this.players[i].name === name) {
         this.players.splice(i, 1);
      }
    }
  };
  this.numPlayers = function() { return this.players.length; };
  this.isFull = function() { return (this.numPlayers() >= 8) };
}

function Player(name, funds) {
  this.name = name;
  this.funds = funds;
  this.payout = function(amount) { this.funds += amount; };
}

var tables = new Array();

for (var i = 0; i<8; i++) {
  tables[i] = new Table(i);
}

io.sockets.on('connection', function (socket) {
  socket.on('roll', function (data) {
    io.sockets.emit('roll', {text: 'rolled dice'});
  });

  socket.on('getTableStatus', function (data) {
    socket.emit('tableStatus', {tables: tables});
  });

  socket.on('getTableInfo', function (data) {
    socket.emit('tableInfo', {info: tables[data.tableNumber]})
  })

  socket.on('joinTable', function(data) {
    if (!tables[data.tableNumber].isFull()) {
      tables[data.tableNumber].addPlayer(new Player(data.name, data.funds));
      socket.emit('newPlayer', {name: data.name, funds: data.funds });
    }
    else {
      socket.emit('joinFailure', {tableNumber: data.tableNumber});
    }
  });

  socket.on('leaveTable', function(data) {
    tables[data.tableNumber].removePlayer(data.name);
  });

});