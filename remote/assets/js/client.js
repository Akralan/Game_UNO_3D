var socket = io();  // Se connectera automatiquement au même hôte que la page

/**
* Declaration of variables
**/

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth * 0.8;

var index;
var cardList = [];
var cards = [];
var color;
var canPlay;
var inGame = false;



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

/** Function PartyJoin **/
// Entries : nothing
// Outputs : nothing
// indicates to the server that the player wants to connect

function partyJoin() {
	var gameId = document.getElementById("gameId").value;
	var username = document.getElementById("userName").value;

	socket.emit('login', {gameId : gameId, username : username});
}

/** Message logged **/
// Entries : nothing
// Outputs : nothing
// displays the standby screen instead of the login screen

socket.on('logged', function() {
	var settingsDiv = document.getElementById("bottomDivId");
	var waitingScreen = document.getElementById("waitingScreen");
	settingsDiv.classList.add("hide");
	waitingScreen.classList.remove("hide");
});



/**
* Manage the waiting screen
**/

/** SetInterval WaitingMessage **/
// Entries : nothing
// Outputs : nothing
// animates the players' waiting message

const wait_msg_dots = window.setInterval( function() {
	var wait = document.getElementById("infoMessage_Title");
	if (wait.innerHTML.length >= 35) 
		wait.innerHTML = "Waiting For The Game To Start";
	else 
		wait.innerHTML += " .";
}, 500);

/** Message gamelaunched **/
// Entries : nothing
// Outputs : nothing
// displays the game screen instead of the standby screen

socket.on('gamelaunched', function() {
	var waitingScreen = document.getElementById("waitingScreen");
	var gameScreen = document.getElementById("gameScreen");
	var logo = document.getElementById("logo");
	waitingScreen.classList.add("hide");
	logo.classList.add("hide");
	gameScreen.classList.remove("hide");
	inGame = true;
});



/**
* Manage the game screen
**/

/** Function RefreshClient **/
// Entries : list : cards
// Outputs : nothing
// updates the image list of the client's cards

function RefreshClient(cards) {
	canvas.width = (canvas.height * 241 / 361) * cards.length + window.innerWidth * 0.2;

	cardList = [];

	for (var i = 0; i < cards.length; i++) {
		card = new Image();
		card.src = "assets/img/" + cards[i].path;
		cardList.push(card);
	}

	var width = window.innerWidth;
	var height = canvas.height;
	var cardHeight = height;
	var cardWidth = cardHeight * 241 / 361;

	var ctx = canvas.getContext("2d");

	if (cards.length != 0) {
		for (var i = 0; i < cardList.length; i++) {
			var cardImg = cardList[i];
			ctx.drawImage(cardImg, cardWidth * i + window.innerWidth * 0.2, 0, cardWidth, cardHeight);
		}
	}
}

/** Function MouseDownEvent **/
// Entries : object : event
// Outputs : nothing
// 

function useCard(event) {
	canvasRectangle = canvas.getBoundingClientRect();
    canvasLeft = canvasRectangle.left;
    posX = event.clientX - canvasLeft
	index = Math.floor((posX - window.innerWidth * 0.2) / (canvas.height * 241 / 361));

	if (index < 0) {index == 0;}

	if (canPlay) {
		if (cards[index].color == "black") {
			var gameScreen = document.getElementById("gameScreen");
			var colorPicker = document.getElementById("colorMenu");
			gameScreen.classList.add("hide");
			colorPicker.classList.remove("hide");
		}
		else {
			color = cards[index].color;

			socket.emit('usecard', {cardRank : index + 1, color : color});
		}
	}
}

/** Message refreshclient **/
// Entries : object : playerCardCanPlay
// Outputs : nothing
// indicates to the client that the server is asking for an update

socket.on('refreshclient', function(playerCardCanPlay) {
	cards = playerCardCanPlay.cards;
	canPlay = playerCardCanPlay.canPlay;
	RefreshClient(cards);
});

/** Function PickCard **/
// Entries : nothing
// Outputs : nothing
// indicates to the server that the client is drawing a card

function pickCard() {
	if (canPlay) {
		socket.emit('pickcard');
	}
}

/** Function ChangeToRed **/
// Entries : nothing
// Outputs : nothing
// tells the server that the client chooses the color red

function changeToRed() {
	var gameScreen = document.getElementById("gameScreen");
	var colorPicker = document.getElementById("colorMenu");
	gameScreen.classList.remove("hide");
	colorPicker.classList.add("hide");

	socket.emit('usecard', {cardRank : index + 1, color : "red"});
}

/** Function ChangeToBlue **/
// Entries : nothing
// Outputs : nothing
// tells the server that the client chooses the color blue

function changeToBlue() {
	var gameScreen = document.getElementById("gameScreen");
	var colorPicker = document.getElementById("colorMenu");
	gameScreen.classList.remove("hide");
	colorPicker.classList.add("hide");
	
	socket.emit('usecard', {cardRank : index + 1, color : "blue"});
}

/** Function ChangeToYellow **/
// Entries : nothing
// Outputs : nothing
// tells the server that the client chooses the color yellow

function changeToYellow() {
	var gameScreen = document.getElementById("gameScreen");
	var colorPicker = document.getElementById("colorMenu");
	gameScreen.classList.remove("hide");
	colorPicker.classList.add("hide");
	
	socket.emit('usecard', {cardRank : index + 1, color : "yellow"});
}

/** Function ChangeToGreen **/
// Entries : nothing
// Outputs : nothing
// tells the server that the client chooses the color green

function changeToGreen() {
	var gameScreen = document.getElementById("gameScreen");
	var colorPicker = document.getElementById("colorMenu");
	gameScreen.classList.remove("hide");
	colorPicker.classList.add("hide");
	
	socket.emit('usecard', {cardRank : index + 1, color : "green"});
}



/** Message hostdisconnect **/
// Entries : nothing
// Outputs : nothing
// makes all screens invisible except the login screen

socket.on('hostdisconnect', function() {
	inGame = false;
	var waitingScreen = document.getElementById("waitingScreen");
	var gameScreen = document.getElementById("gameScreen");
	var colorPicker = document.getElementById("colorMenu");
	var logo = document.getElementById("logo");
	var settingsDiv = document.getElementById("bottomDivId");
	var changeRotation = document.getElementById("changeRotation");
	waitingScreen.classList.add("hide");
	gameScreen.classList.add("hide");
	colorPicker.classList.add("hide");
	logo.classList.remove("hide");
	settingsDiv.classList.remove("hide");
	changeRotation.classList.add("hide");
});

/** Test **/
// Entries : nothing
// Outputs : nothing
// redirects the client as a host

if (window.innerWidth > window.innerHeight) {
    document.location.href = "/";  // Rediriger vers la racine au lieu de /uno/
}

/** Test **/
// Entries : nothing
// Outputs : nothing
// forces you to pick up the phone the right way to play

setInterval(function() {
	if (window.innerWidth < window.innerHeight && inGame == true) {
		var changeRotation = document.getElementById("changeRotation");
		changeRotation.classList.remove("hide");
	}
	if (window.innerWidth > window.innerHeight && inGame == true) {
		var changeRotation = document.getElementById("changeRotation");
		changeRotation.classList.add("hide");
	}
}, 200);