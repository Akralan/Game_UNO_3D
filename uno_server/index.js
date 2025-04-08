//var https = require('https'),     
//  fs =    require('fs');        
//var options = {
//    key:    fs.readFileSync('../../opt/lampp/etc/ssl/private.key'),
//    cert:   fs.readFileSync('../../opt/lampp/etc/ssl/certificate.crt'),
//    ca:     fs.readFileSync('../../opt/lampp/etc/ssl/ca_bundle.crt')
//};
//var app = https.createServer(options);
//const server = app.listen(50000, "chagot-games.fr");
//io = require('socket.io')(server, {origins:'chagot-games.fr:*'}).listen(app);

var http = require('http');
var express = require('express');
var path = require('path');
var cors = require('cors');

var app = express();

// Servir les fichiers statiques depuis le répertoire parent
app.use(express.static(path.join(__dirname, '..')));

app.use(cors({
    origin: true,
    credentials: true
}));

var server = http.createServer(app);
var io = require('socket.io')(server, {
    origins: '*:*'  // Configuration Socket.IO 2.3.0
});

server.listen(50000, "localhost", () => {
    console.log('Server running at http://localhost:50000');
});

var games = [];

io.sockets.on('connection', function(socket) {

	socket.on('login', function(player) {
		for (var i = 0; i < games.length; i++) {
			if (games[i].gameId == player.gameId && games[i].joinable == true) {
				games[i].players.push({id : socket.id, username : player.username});
				socket.emit('logged');

				io.sockets.to(games[i].id).emit('changeplayernumber', games[i].players.length);
			}
		}
	});

	socket.on('usecard', function(cardToUse) {
		for (var i = 0; i < games.length; i++) {
			for (var j = 0; j < games[i].players.length; j++) {
				if (games[i].players[j].id == socket.id) {
					io.sockets.to(games[i].id).emit('usecard', {cardRank : cardToUse.cardRank, color : cardToUse.color});
				}
			}
		}
	});

	socket.on('pickcard', function() {
		for (var i = 0; i < games.length; i++) {
			for (var j = 0; j < games[i].players.length; j++) {
				if (games[i].players[j].id == socket.id) {
					io.sockets.to(games[i].id).emit('pickcard');
				}
			}
		}
	});

	socket.on('creategame', function() {
		var gameId;
		var illegalId = true;
		var players = [];

		while (illegalId) {
			gameId = Math.round(Math.random() * 9999) + 1;
			illegalId = false;
			for (var i = 0; i < games.length; i++) {
				if (games[i].id == gameId) {illegalId = true;}
			}
		}

		games.push({id : socket.id, gameId : gameId, players : players, joinable : true});

		socket.emit('gamecreated', gameId);
	});

	socket.on('launchgame', function() {
		for (var i = 0; i < games.length; i++) {
			if (games[i].id == socket.id && games[i].players.length >= 2) {
				games[i].joinable = false;

				socket.emit('gamelaunched', games[i].players);

				for (var j = 0; j < games[i].players.length; j++) {
					io.sockets.to(games[i].players[j].id).emit('gamelaunched');
				}
			}
		}
	});

	socket.on('refreshclient', function(playerCardCanPlay) {
		for (var i = 0; i < playerCardCanPlay.playerList.length; i++) {
			io.sockets.to(playerCardCanPlay.playerList[i].id).emit('refreshclient', {cards : playerCardCanPlay.playerList[i].cards, canPlay : playerCardCanPlay.playerTurn[i]});
		}
	});

	socket.on('endgame', function() {
		for (var i = 0; i < games.length; i++) {
			if (games[i].id == socket.id) {
				for (var j = 0; j < games[i].players.length; j++) {
					io.sockets.to(games[i].players[j].id).emit('hostdisconnect');
				}

				games.splice(i, 1);
			}
		}
	});

	socket.on('disconnect', function() {
		for (var i = 0; i < games.length; i++) {
			for (var j = 0; j < games[i].players.length; j++) {
				if (games[i].players[j].id == socket.id) {
					if (games[i].joinable == false) {
						io.sockets.to(games[i].id).emit('playerdisconnectduringgame', {number : games[i].players.length - 1, playerId : games[i].players[j].id});
					}

					games[i].players.splice(j, 1);

					io.sockets.to(games[i].id).emit('changeplayernumber', games[i].players.length);
				}
			}
		}

		for (var i = 0; i < games.length; i++) {
			if (games[i].id == socket.id) {
				for (var j = 0; j < games[i].players.length; j++) {
					io.sockets.to(games[i].players[j].id).emit('hostdisconnect');
				}

				games.splice(i, 1);
			}
		}
	});
});