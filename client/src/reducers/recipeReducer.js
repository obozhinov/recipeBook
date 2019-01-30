import { GET_RECIPES } from "../actions/types";

const initalState = {
  projects: [],
  project: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };

    default:
      return state;
  }
}
