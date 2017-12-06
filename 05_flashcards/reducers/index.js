import { ACTIONS } from '../actions';

const initialState = {};

const decks = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.LOAD_DECKS:
    // TODO: Retrieve decks from AsyncStorace
    return {...state};
  case ACTIONS.ADD_DECK:
    return {...state, ...action.deck};
  default:
    return state;
  }
};

export default decks;
