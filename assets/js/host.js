//window.server = "https://chagot-games.fr";
//var port = "50000";
//var socket = io.connect(server + ":" + port);

var socket = io();  // Se connectera automatiquement au même hôte que la page

/**
* Manage the main screen
**/

/** Function RainbowLogo **/
// Entries : nothing
// Outputs : nothing
// launches the animation of the uno logo

function rainbowLogo() {
	var colors = ["#FF0000", "#00FF00", "#0000FF"];
	var i = 1;
	var logoBg = document.getElementsByClassName("st0")[0];

	var y = 0, howManyTimes = 10;
	function rainbowLogo_Animation() {
		logoBg.style.fill = colors[i];
		i++;
		y++;
		if (i === colors.length){i=0;}
		if( y < howManyTimes ){
			setTimeout(rainbowLogo_Animation, 200);
		}
		else {
			rainbowLogo_End();
		}
	}
	rainbowLogo_Animation();
}

/** Function RainbowLogo_End **/
// Entries : nothing
// Outputs : nothing
// end the animation of the uno logo

function rainbowLogo_End() {
	var logoBg = document.getElementsByClassName("st0")[0];
	logoBg.style.fill = "#E74C3C";
}

/** Function RulesShow **/
// Entries : nothing
// Outputs : nothing
// opens the page that explains the game

function controlShow() {
	var settingsDiv = document.getElementById("rules");
	settingsDiv.classList.remove("hide");
	var controlsDiv = document.getElementById("controlScreen");
	controlsDiv.classList.remove("hide");
}

/** Function RulesRead **/
// Entries : nothing
// Outputs : nothing
// closes the page that explains the game

function controlRead() {
	var settingsDiv = document.getElementById("rules");
	settingsDiv.classList.add("hide");
	var controlsDiv = document.getElementById("controlScreen");
	controlsDiv.classList.add("hide");
}

/** Function CreateGame **/
// Entries : nothing
// Outputs : nothing
// asks the server to start a game

function createGame() {
	var multiDiv = document.getElementById("multiDiv");
	multiDiv.classList.add("hide");
	var multiDiv = document.getElementById("waitingScreen");
	multiDiv.classList.remove("hide");

	var logo = document.getElementById("logo");
	logo.style.width = "300px";
	logo.style.marginLeft = "-300px";
	logo.style.right = "30px";
	logo.style.left = "inherit";

	socket.emit('creategame');
}

/** Function LaunchGame **/
// Entries : nothing
// Outputs : nothing
// starts the game if there are enough players

function launchGame() {
	socket.emit('launchgame');
}



/**
* Manage the waiting screen
**/

/** SetInterval WaitingMessage **/
// Entries : nothing
// Outputs : nothing
// animates the players' waiting message

const wait_msg_dots = window.setInterval( function() {
	var wait = document.getElementById("infoMessage_Dots");
	if ( wait.innerHTML.length >= 6 ) 
		wait.innerHTML = "";
	else 
		wait.innerHTML += " .";
}, 500);

/** Message changeplayernumber **/
// Entries : nothing
// Outputs : nothing
// updates the display of the number of players

socket.on('changeplayernumber', function(playerNb) {
	var playerNumber = document.getElementById("infoPlayers_Data");
	playerNumber.innerHTML = playerNb + " / 8";
});

/** Message gamecreated **/
// Entries : nothing
// Outputs : nothing
// updates the display of the game Id

socket.on('gamecreated', function(gameId) {
	var id = document.getElementById("infoID_Data");
	id.innerHTML = gameId;
});

/** Message gamelaunched **/
// Entries : nothing
// Outputs : nothing
// create the game object and display the game screen

socket.on('gamelaunched', function(players) {
	var multiDiv = document.getElementById("waitingScreen");
	multiDiv.classList.add("hide");
	var logo = document.getElementById("logo");
	logo.classList.add("hide");

	game = new Game(players);
});



/**
* Manage the game screen
**/

/** Function PlayerWon **/
// Entries : nothing
// Outputs : nothing
// tells the server that a player has won the game

function PlayerWon() {
	socket.emit('endgame');
}

/** Function RefreshClient **/
// Entries : nothing
// Outputs : nothing
// tells the server that the host has requested to update the client display

function RefreshClient(playerList, playerTurn) {
	socket.emit('refreshclient', {playerList, playerTurn});
}

/** Message pickcard **/
// Entries : nothing
// Outputs : nothing
// indicates to the game that a player has disconnected during the game

socket.on('playerdisconnectduringgame', function(playerNumberAndId) {
	if (playerNumberAndId.number == 1) {
		for (var i = 0; i < game.players.length; i++) {
			if (game.players[i].id != playerNumberAndId.id) {game.playerwon(i);}
		}
	}

	game.playerdisconnect(playerNumberAndId.number, playerNumberAndId.playerId);
});

/** Message pickcard **/
// Entries : nothing
// Outputs : nothing
// indicates to the game that a player is using a card

socket.on('usecard', function(cardToUse) {
	game.playerusecard(cardToUse.cardRank, cardToUse.color);
});

/** Message pickcard **/
// Entries : nothing
// Outputs : nothing
// indicates to the game that a player wants to draw

socket.on('pickcard', function() {
	game.playerpickcard();
});



/** Test **/
// Entries : nothing
// Outputs : nothing
// redirects the host as a client

setInterval(function() {
	if (window.innerWidth < window.innerHeight) {
		document.location.href = server + '/uno/remote/';
	}
}, 200);