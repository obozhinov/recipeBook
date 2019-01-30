import axios from "axios";
import { GET_ERRORS, GET_RECIPES } from "./types";

export const createRecipe = (recipe, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/recipe", recipe);
    history.push("/");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getRecipes = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/recipe/all");
  dispatch({
    type: GET_RECIPES,
    payload: res.data
  });
};
