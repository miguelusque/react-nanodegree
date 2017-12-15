import { ACTIONS } from '../actions';

const initialState = {};

const decks = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_DECKS:
    return {...state, ...action.decks};
  case ACTIONS.ADD_DECK:
    return {...state, ...action.deck};
  case ACTIONS.ADD_CARD:
    return {...state,
      [action.deckTitle]: {
        'questions': [...state[action.deckTitle].questions, action.card]
      }
    };
  default:
    return state;
  }
};

export default decks;
