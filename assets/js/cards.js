/**
* Class for the cards
**/

class Normal_Card {

	/** Method Constructor **/
	// Entries : string : color / int : number, temp
	// Outputs : nothing
	// create the variables that will belong to the card object

	constructor(color, number, temp) {
		this.color = color;
		this.number = number;
		this.temp = temp;
		this.path = "cards/" + this.number.toString() + "_" + this.color.toString() + ".png";
	}

	/** Method Use **/
	// Entries : int : cardRank, direction / objects : discard, players, recDeck / list : numberTurn
	// Outputs : int : direction / objects : discard, players, recDeck / list : numberTurn
	// adds the card to the discard pile

	use(discard, numberTurn, players, cardRank, recDeck, direction) {
		discard.cardListDiscard.unshift(players[numberTurn - 1].cards[cardRank - 1]); // adds the card played at the beginning of the discard pile

		return [discard, numberTurn, players, recDeck, direction];
	}
}

class MiniJoker_Card {

	/** Method Constructor **/
	// Entries : string : color / int : number, temp
	// Outputs : nothing
	// create the variables that will belong to the card object

	constructor(color, number, temp) {
		this.color = color;
		this.number = "mini_joker";
		this.temp = temp;
		this.path = "cards/mn_" + this.color.toString() + ".png";
	}

	/** Method Use **/
	// Entries : int : cardRank, direction / objects : discard, players, recDeck / list : numberTurn
	// Outputs : int : direction / objects : discard, players, recDeck / list : numberTurn
	// adds the card to the discard pile and modifies the recDeck to make the next player draw 2 more cards without passing his turn

	use(discard, numberTurn, players, cardRank, recDeck, direction) {
		discard.cardListDiscard.unshift(players[numberTurn - 1].cards[cardRank - 1]); // adds the card played at the beginning of the discard pile

		return [discard, numberTurn, players, {numberCard : recDeck.numberCard + 2, canPlay : true}, direction];
	}
}

class DirectionChange_Card {

	/** Method Constructor **/
	// Entries : string : color / int : number, temp
	// Outputs : nothing
	// create the variables that will belong to the card object

	constructor(color, number, temp) {
		this.color = color;
		this.number = "direction_change";
		this.temp = temp;
		this.path = "cards/dc_" + this.color.toString() + ".png";
	}

	/** Method Use **/
	// Entries : int : cardRank, direction / objects : discard, players, recDeck / list : numberTurn
	// Outputs : int : direction / objects : discard, players, recDeck / list : numberTurn
	// adds the card to the discard pile and modifies the direction to change the direction of play

	use(discard, numberTurn, players, cardRank, recDeck, direction) {
		discard.cardListDiscard.unshift(players[numberTurn - 1].cards[cardRank - 1]); // adds the card played at the beginning of the discard pile

		return [discard, numberTurn, players, recDeck, direction * -1];
	}
}

class TurnPass_Card {

	/** Method Constructor **/
	// Entries : string : color / int : number, temp
	// Outputs : nothing
	// create the variables that will belong to the card object

	constructor(color, number, temp) {
		this.color = color;
		this.number = "turn_pass";
		this.temp = temp;
		this.path = "cards/tp_" + this.color.toString() + ".png";
	}

	/** Method Use **/
	// Entries : int : cardRank, direction / objects : discard, players, recDeck / list : numberTurn
	// Outputs : int : direction / objects : discard, players, recDeck / list : numberTurn
	// adds the card to the discard pile and modifies the NumberTurn to pass the turn of the next player

	use(discard, numberTurn, players, cardRank, recDeck, direction) {
		discard.cardListDiscard.unshift(players[numberTurn - 1].cards[cardRank - 1]); // adds the card played at the beginning of the discard pile

		return [discard, numberTurn + direction, players, recDeck, direction];
	}
}

class Joker_Card {

	/** Method Constructor **/
	// Entries : string : color / int : number, temp
	// Outputs : nothing
	// create the variables that will belong to the card object

	constructor(color, number, temp) {
		this.color = "black";
		this.number = "joker";
		this.temp = temp;
		this.path = "cards/j_black.png";
	}

	/** Method Use **/
	// Entries : int : cardRank, direction / objects : discard, players, recDeck / list : numberTurn
	// Outputs : int : direction / objects : discard, players, recDeck / list : numberTurn
	// adds the card to the discard pile and allows the player to choose the colour of the discard card

	use(discard, numberTurn, players, cardRank, recDeck, direction) {
		discard.cardListDiscard.unshift(players[numberTurn - 1].cards[cardRank - 1]); // adds the card played at the beginning of the discard pile

		return [discard, numberTurn, players, recDeck, direction];
	}
}

class SuperJoker_Card {

	/** Method Constructor **/
	// Entries : string : color / int : number, temp
	// Outputs : nothing
	// create the variables that will belong to the card object

	constructor(color, number, temp) {
		this.color = "black";
		this.number = "super_joker";
		this.temp = temp;
		this.path = "cards/sj_black.png";
	}

	/** Method Use **/
	// Entries : int : cardRank, direction / objects : discard, players, recDeck / list : numberTurn
	// Outputs : int : direction / objects : discard, players, recDeck / list : numberTurn
	// adds the card to the discard pile and allows the player to choose the colour of the discard card and modifies the recDeck to make the next player draw 4 cards while passing his turn

	use(discard, numberTurn, players, cardRank, recDeck, direction) {
		discard.cardListDiscard.unshift(players[numberTurn - 1].cards[cardRank - 1]); // adds the card played at the beginning of the discard pile

		return [discard, numberTurn + direction, players, {numberCard : 4, canPlay : false}, direction];
	}
}