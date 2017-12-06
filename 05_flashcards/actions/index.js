export const ACTIONS = {
  LOAD_DECKS: 'LOAD_DECKS',
  ADD_DECK: 'ADD_DECK'
};

export const loadDecks = decks => ({
  type: ACTIONS.LOAD_DECKS,
  decks
});

export const addDeck = deck => ({
  type: ACTIONS.ADD_DECK,
  deck
});
