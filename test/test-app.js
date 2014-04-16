var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};


var player1 = { tableNumber: 0, name: 'Aaron', funds: 2000, sid: 'ABCDE' };
var player2 = { tableNumber: 0, name: 'Someguy', funds: 1000, sid: 'VWXYZ' };
var player3 = { tableNumber: 0, name: 'Tom', funds: 2000, sid: 'fd2ed' };
var player4 = { tableNumber: 0, name: 'Jason', funds: 1000, sid: 'uybf3' };
var player5 = { tableNumber: 0, name: 'Mike', funds: 2000, sid: '2j7ds' };
var player6 = { tableNumber: 0, name: 'Karan', funds: 1000, sid: 'zxssa' };
var player7 = { tableNumber: 0, name: 'Blake', funds: 2000, sid: 'l34fs' };
var player8 = { tableNumber: 0, name: 'Michael', funds: 1000, sid: '83fDs' };
var playerfull = { tableNumber: 0, name: 'full', funds: 1000, sid: 'EF3sa' };



describe("the Craps game server",function() {

  it('should allow players to join an empty table', function(done) {
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data) {
      client1.emit('joinTable', player1);
    });

    client1.on('tableInfo', function(data) {
        data.info.players.length.should.equal(1);
        data.info.players[0].name.should.equal(player1.name);
        client1.emit('leaveTable', {tableNumber: 0, name: player1.name});
        client1.disconnect();
        done();
    });
  });

  it('should allow players to join a table with players', function(done) {
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data) {
      client1.emit('joinTable', { tableNumber: 1, name: 'Aaron', funds: 2000, sid: 'ABCDE' });
      var client2 = io.connect(socketURL, options);
      client2.on('connect', function(data) {
        client2.emit('joinTable', { tableNumber: 1, name: 'someguy', funds: 2000, sid: 'ABCDE' });
      });
      client2.on('tableInfo', function(data) {
        data.info.players.length.should.equal(2);
        client1.emit('leaveTable', {tableNumber: 1, name: 'Aaron'});
        client1.disconnect();
        client2.emit('leaveTable', {tableNumber: 1, name: 'someguy'});
        client2.disconnect();
        done();
    });
    });
  });

  it('should allow players to leave a table', function(done) {
    var client1 = io.connect(socketURL, options);
    var client2;
    var responseCount = 0;
    client1.on('connect', function(data) {
      client1.emit('joinTable', { tableNumber: 2, name: 'Aaron', funds: 2000, sid: 'ABCDE' });
      client2 = io.connect(socketURL, options);
      client2.on('connect', function(data) {
        client2.emit('joinTable', { tableNumber: 2, name: 'Someguy', funds: 2000, sid: 'ABCDE' });
      });
    });

    client1.on('tableInfo', function (data) {
      responseCount++;
      if (responseCount == 1) {
        // when client 1 joins the table
        data.info.players.length.should.equal(1);
        return;
      }
      if (responseCount == 2) {
        // when client 2 joins
        data.info.players.length.should.equal(2);
        client2.emit('leaveTable', {tableNumber: 2, name: 'Someguy'});
        client2.disconnect();
        return;
      }
      if (responseCount == 3) {
        // when client 2 leaves
        data.info.players.length.should.equal(1);
        client1.emit('leaveTable', {tableNumber: 2, name: 'Aaron'});
        client1.disconnect();
        done();
      }
    });
  });

  it('should NOT allow players to join a full table', function(done) {
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data) {
      client1.emit('joinTable', player1);
      var client2 = io.connect(socketURL, options);
      client2.on('connect', function(data) {
        client2.emit('joinTable', player2);
        var client3 = io.connect(socketURL, options);
        client3.on('connect', function(data) {
          client3.emit('joinTable', player3);
          var client4 = io.connect(socketURL, options);
          client4.on('connect', function(data) {
            client4.emit('joinTable', player4);
            var client5 = io.connect(socketURL, options);
            client5.on('connect', function(data) {
              client5.emit('joinTable', player5);
              var client6 = io.connect(socketURL, options);
              client6.on('connect', function(data) {
                client6.emit('joinTable', player6);
                var client7 = io.connect(socketURL, options);
                client7.on('connect', function(data) {
                  client7.emit('joinTable', player7);
                  var client8 = io.connect(socketURL, options);
                  client8.on('connect', function(data) {
                    client8.emit('joinTable', player8);
                    var clientfull = io.connect(socketURL, options);
                    clientfull.on('connect', function(data) {
                      clientfull.emit('joinTable', playerfull);
                    });
                    clientfull.on('joinFailure', function(data) {
                      data.tableNumber.should.equal(0);
                      client1.emit('leaveTable', {tableNumber: 0, name: player1.name});
                      client1.disconnect();
                      client2.emit('leaveTable', {tableNumber: 0, name: player2.name});
                      client2.disconnect();
                      client3.emit('leaveTable', {tableNumber: 0, name: player3.name});
                      client3.disconnect();
                      client4.emit('leaveTable', {tableNumber: 0, name: player4.name});
                      client4.disconnect();
                      client5.emit('leaveTable', {tableNumber: 0, name: player5.name});
                      client5.disconnect();
                      client6.emit('leaveTable', {tableNumber: 0, name: player6.name});
                      client6.disconnect();
                      client7.emit('leaveTable', {tableNumber: 0, name: player7.name});
                      client7.disconnect();
                      client8.emit('leaveTable', {tableNumber: 0, name: player8.name});
                      client8.disconnect();
                      clientfull.disconnect();
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it('should properly provide payouts', function(done) {
    var client1 = io.connect(socketURL, options);
    var responseCount = 0;
    client1.on('connect', function(data) {
      client1.emit('joinTable', player1);
      client1.emit('payouts', {tableNumber: 0, amount: 500, sid: player1.sid});
    });

    client1.on('tableInfo', function(data) {
      if(responseCount == 1) {
        data.info.players[0].funds.should.equal(player1.funds+500);
        client1.emit('leaveTable', {tableNumber: 0, name: player1.name});
        client1.disconnect();
        done();
      } else {
        responseCount++;
      }
    });
  });

  it('should allow mobile devices to connect and roll', function(done) {
    var mobile = io.connect(socketURL, options);
    mobile.on('connect', function(data) {
      mobile.emit('mobileJoinTable', {tableNumber: 0});
    });

    mobile.on('tableInfo', function(data) {
      mobile.emit('mobileRoll', {tableNumber: 0, sid: 'ABCDE'});
    });

    mobile.on('mobileRoll', function(data) {
      data.sid.should.equal('ABCDE');
      mobile.disconnect();
      done();
    });
  });

  it('should support eight concurrent tables', function(done) {
    var client = io.connect(socketURL, options);
    client.on('connect', function(data) {
        client.emit('getTableStatus', {});
    });

    client.on('tableStatus', function(data) {
      data.tables.length.should.equal(8);
      client.disconnect();
      done();
    });
  });

  it('should allow the lobby to poll the server for tableStatus', function(done) {
    var lobby = io.connect(socketURL, options);
    var pollCount = 0;
    lobby.on('connect', function(data) {
      setInterval(function() {
        lobby.emit('getTableStatus', {});
      }, 200);
    });

    lobby.on('tableStatus', function(data) {
      pollCount++;
      if (pollCount > 5) {
        lobby.disconnect();
        done();
      }
    });
  });

});