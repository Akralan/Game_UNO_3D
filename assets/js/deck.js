/**
* Class for the deck
**/

class Deck {

	/** Method Constructor **/
	// Entries : nothing
	// Outputs : nothing
	// create the variables that will belong to the discard object

	constructor() {
		this.cardListUnmix = [];
		this.cardListMix = [];
	}

	/** Method Mix **/
	// Entries : nothing
	// Outputs : nothing
	// filled the deck with the cards

	fill() {
		var colors = ["yellow", "green", "red", "blue"]

		for (var i = 0; i < 4; i++) { // goes through the four colours
			var color = colors[i]; 
			this.cardListUnmix.push(new Normal_Card(color, 0, 1)); // adds a card

			for (var y = 1; y <= 9; y++) {
				this.cardListUnmix.push(new Normal_Card(color, y, 1)); // adds a card
				this.cardListUnmix.push(new Normal_Card(color, y, 2)); // adds a card
			}
			for (var y = 0; y < 2; y++) {
				this.cardListUnmix.push(new MiniJoker_Card(color, y, 1)); // adds a card
				this.cardListUnmix.push(new DirectionChange_Card(color, y, 2)); // adds a card
				this.cardListUnmix.push(new TurnPass_Card(color, y, 3)); // adds a card
			}
		}
		for (var y = 0; y < 4; y++) {
			this.cardListUnmix.push(new Joker_Card("", y, 0)); // adds a card
			this.cardListUnmix.push(new SuperJoker_Card("", y, 1)); // adds a card
		}

		if (this.cardListUnmix.length == 108) {
			this.mix();
		}
	}

	/** Method Mix **/
	// Entries : nothing
	// Outputs : nothing
	// shuffles the cards of the deck pile

	mix() {
		var numberCards = this.cardListUnmix.length;

		for (var i = 0; i < numberCards; i++) {
			var index = Math.floor(Math.random() * this.cardListUnmix.length); // choose a card randomly
			this.cardListMix.push(this.cardListUnmix[index]);
			this.cardListUnmix.splice(index, 1);
		}
	}

	/** Method Distribute **/
	// Entries : list : players
	// Outputs : list : players
	// deals 7 cards to each player at the beginning of the game

	distribute(players) {
		for (var i = 0; i < players.length; i++) {
			for (var j = 0; j < 7; j++) {
				players[i].cards.push(this.cardListMix[0]); // adds the card to the player
				this.cardListMix.shift();
			}
		}

		return players;
	}

	/** Method Defuse **/
	// Entries : object : discard
	// Outputs : object : discard
	// flips the first card of the deck at the beginning of the game

	defuse(discard) {
		var validCard = false;

		while (validCard == false) {
			validCard = true;

			if (this.cardListMix[0].number == "mini_joker" || this.cardListMix[0].number == "direction_change" || this.cardListMix[0].number == "turn_pass" || this.cardListMix[0].color == "black") { // verifies that the card on the discard pile is not an action card)
				this.cardListMix.push(this.cardListMix[0]); // puts the first card at the end
				this.cardListMix.shift();
				validCard = false;
			}
		}

		discard.cardListDiscard.push(this.cardListMix[0]); // puts the first card at the end
		this.cardListMix.shift();

		return discard;
	}

	/** Method Storeplayer **/
	// Entries : list : cards
	// Outputs : nothing
	// put the disconnected player's cards in the deck

	storeplayer(cards) {
		for (var i = 0; i < cards.length; i++) {
			this.cardListMix.push(cards[0]); // adds at the end the player's card
			cards.shift();
		}
	}

	/** Method Pick **/
	// Entries : list : cards / int : numberToPick
	// Outputs : list : cards
	// makes the player draw a number of cards

	pick(cards, numberToPick) {
		for (var i = 0; i < numberToPick; i++) {
			if (this.cardListMix.length > 0) {
				cards.unshift(this.cardListMix[0]); // adds to the player's cards the first card
				this.cardListMix.shift();
			}
		}

		return cards;
	}
}