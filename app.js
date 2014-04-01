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

function Player(name, funds) {
  this.sid = makeid();
  this.name = name;
  this.funds = parseInt(funds);
  this.payout = function(amount) { this.funds += amount; };
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var tables = new Array();

for (var i = 0; i<8; i++) {
  tables[i] = new Table(i);
}

io.sockets.on('connection', function (socket) {

  socket.on('roll', function (data) {
    io.sockets.in(data.tableNumber).emit('simulate', {text: 'rolled dice'});
    tables[data.tableNumber].nextTurn();
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
      tables[data.tableNumber].addPlayer(new Player(data.name, data.funds));
      io.sockets.in(data.tableNumber).emit('tableInfo', {info: tables[data.tableNumber]});
      //io.sockets.in(data.tableNumber).emit('playerList', {players: tables[data.tableNumber].players});
    }
    else {
      socket.emit('joinFailure', {tableNumber: data.tableNumber});
    }
  });

  socket.on('leaveTable', function(data) {
    socket.leave(data.tableNumber);
    tables[data.tableNumber].removePlayer(data.name);
    io.sockets.in(data.tableNumber).emit('playerList', {players: tables[data.tableNumber].players});
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