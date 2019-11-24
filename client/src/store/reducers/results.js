import uuid from "uuid/v4";
import actions from "../actions";

const initalState = {
  results: []
};

const resultsReducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.SAVE:
      return {
        ...state,
        results: [...state.results, { id: uuid(), value: action.value }]
      };

    case actions.DELETE:
      return {
        ...state,
        results: state.results.filter(result => result.id !== action.id)
      };

    default:
      return state;
  }
};

export default resultsReducer;
