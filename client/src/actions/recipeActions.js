import axios from "axios";
import { GET_ERRORS, GET_RECIPES, GET_RECIPE, DELETE_RECIPE } from "./types";

export const createRecipe = (recipe, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/recipe", recipe);
    history.push("/");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
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

export const getRecipe = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/recipe/${id}`);
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (error) {
    history.push("/");
  }
};

export const deleteRecipe = (id, history) => async dispatch => {
  await axios.delete(`http://localhost:8080/recipe/${id}`);
  dispatch({
    type: DELETE_RECIPE,
    payload: id
  });
};
