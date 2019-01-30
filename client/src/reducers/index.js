import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";

export default combineReducers({
  errors: errorReducer,
  recipe: recipeReducer
});
