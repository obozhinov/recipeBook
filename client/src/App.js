import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import AddRecipe from "./Component/AddRecipe";
import Dashboard from "./Component/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import RecipeItem from "./Component/RecipeItem";
import UpdateRecipe from "./Component/UpdateRecipe";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container-fluid p-0">
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
              <NavLink className="navbar-brand" to="/">
                Recipe Book
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo03"
              >
                <ul className="navbar-nav mr-auto">
                  <li>
                    <NavLink className="nav-link" exact to="/">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/add-recipe">
                      Add Recipe
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/add-recipe" component={AddRecipe} />
              <Route path="/update-recipe/:id" component={UpdateRecipe} />
              <Route path="/:id" component={RecipeItem} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
