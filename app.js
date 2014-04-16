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

app.get('/lobby', function (req, res) {
  res.sendfile(__dirname + '/lobby.html');
});

app.get('/game', function (req, res) {
  res.sendfile(__dirname + '/game.html');
});

/* Craps Game Stuff */


function Table(id) {
  this.id = id;
  this.players = [];
  this.playerTurn = 0;
  this.addPlayer = function(p) {
    this.players.push(p);
  };
  this.removePlayer = function(name) {
    if (this.playerTurn == this.players.length-1) {
      this.playerTurn = 0;
    }
    for(var i = this.players.length - 1; i >= 0; i--) {
      if (this.players[i].name === name) {
         this.players.splice(i, 1);
      }
    }
  };
  this.numPlayers = function() { return this.players.length; };
  this.isFull = function() { return (this.numPlayers() >= 8); };
  this.nextTurn = function() { this.playerTurn = (this.playerTurn + 1) % this.numPlayers(); };
}

function Player(sid, name, funds) {
  this.sid = sid;
  this.name = name;
  this.funds = parseInt(funds);
  this.payout = function(amount) { this.funds += amount; };
}

var tables = new Array();

for (var i = 0; i<8; i++) {
  tables[i] = new Table(i);
}

io.sockets.on('connection', function (socket) {

  socket.on('roll', function (data) {
    socket.broadcast.to(data.tableNumber).emit('simulate', {sid: data.sid, dieValue1: data.dieValue1, dieValue2: data.dieValue2});
    io.sockets.in(data.tableNumber).emit('tableInfo', {info: tables[data.tableNumber]});
  });

  socket.on('passDice', function(data) {
    tables[data.tableNumber].nextTurn();
    io.sockets.in(data.tableNumber).emit('tableInfo', {info: tables[data.tableNumber]});
  });

  socket.on('getTableStatus', function (data) {
    socket.emit('tableStatus', {tables: tables});
  });

  socket.on('getTableInfo', function (data) {
    socket.emit('tableInfo', {info: tables[data.tableNumber]})
  })

  socket.on('joinTable', function(data) {
    if (!tables[data.tableNumber].isFull()) {
      socket.join(data.tableNumber);
      tables[data.tableNumber].addPlayer(new Player(data.sid, data.name, data.funds));
      io.sockets.in(data.tableNumber).emit('tableInfo', {info: tables[data.tableNumber]});
    }
    else {
      socket.emit('joinFailure', {tableNumber: data.tableNumber});
    }
  });

  socket.on('mobileJoinTable', function(data) {
    socket.join(data.tableNumber);
    socket.emit('tableInfo', {info: tables[data.tableNumber]});
  });

  socket.on('mobileRoll', function(data) {
    io.sockets.in(data.tableNumber).emit('mobileRoll', {sid: data.sid})
  });

  socket.on('leaveTable', function(data) {
    socket.leave(data.tableNumber);
    tables[data.tableNumber].removePlayer(data.name);
    io.sockets.in(data.tableNumber).emit('tableInfo', {info: tables[data.tableNumber]});
  });

  socket.on('payouts', function(data) {
  for(var i = 0; i < tables[data.tableNumber].players.length; i++)
	if(tables[data.tableNumber].players[i].sid == data.sid)
	{
		tables[data.tableNumber].players[i].payout(data.amount);
		io.sockets.in(data.tableNumber).emit('tableInfo',{info: tables[data.tableNumber]});
	}
  });

});