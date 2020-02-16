export const ACTIONS = {
  SET_DECKS: 'SET_DECKS',
  ADD_DECK: 'ADD_DECK',
  ADD_CARD: 'ADD_CARD'
};

export const setDecks = (decks) => ({
  type: ACTIONS.SET_DECKS,
  decks
});

export const addDeck = (deck) => ({
  type: ACTIONS.ADD_DECK,
  deck
});

export const addCard = (deckTitle, card) => ({
  type: ACTIONS.ADD_CARD,
  deckTitle,
  card
});
