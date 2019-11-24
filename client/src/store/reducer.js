import uuid from "uuid/v4";
import actions from "../store/actions";

const initalState = {
  counter: 0,
  results: []
};

const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };

    case actions.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };

    case actions.ADD:
      return {
        ...state,
        counter: state.counter + action.value
      };

    case actions.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.value
      };

    case actions.SAVE:
      return {
        ...state,
        results: [...state.results, { id: uuid(), value: action.value }]
      };

    case actions.DELETE:
      return {
        ...state,
        results: state.results.filter(r => r.id !== action.id)
      };

    default:
      return state;
  }
};

export default rootReducer;
