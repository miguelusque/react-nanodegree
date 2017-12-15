import {AsyncStorage} from 'react-native';

export const FLASHCARDS_STORAGE_KEY = 'miguelangel:flashcards';

export const fetchDecks = () => (
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks))
);

export const addDeck = (deck) => (
  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deck)
));
