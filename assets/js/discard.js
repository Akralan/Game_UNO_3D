/**
* Class for the discard
**/

class Discard {

	/** Method Constructor **/
	// Entries : nothing
	// Outputs : nothing
	// create the variables that will belong to the discard object

	constructor() {
		this.cardListDiscard = [];
	}

	/** Method Store **/
	// Entries : object : deck
	// Outputs : object : deck
	// put the cards from the discard pile in the deck except the first card

	store(deck) {
		deck.cardListUnmix = this.cardListDiscard;
		deck.cardListUnmix.shift(); // removes the last card
		this.cardListDiscard = [this.cardListDiscard[0]]; // keeps the first card only
		deck.mix();

		return deck;
	}
}