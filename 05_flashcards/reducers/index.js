import { ACTIONS } from '../actions';
import {updateDecks} from '../utils/api';

const initialState = {};

const decks = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_DECKS:
    return {...state, ...action.decks};
  case ACTIONS.ADD_DECK:
    // Update decks into storage
    state = {...state, ...action.deck};
    updateDecks(state);

    return state;
  case ACTIONS.ADD_CARD:
    state = {
      ...state,
      [action.deckTitle]:
      {
        'title': action.deckTitle,
        'questions': [...state[action.deckTitle].questions, action.card]}
    };

    updateDecks(state);

    return state;
  default:
    return state;
  }
};

export default decks;
