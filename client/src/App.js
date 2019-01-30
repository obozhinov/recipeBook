import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";
/* import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom"; */
import AddRecipe from "./Component/AddRecipe";
import EditRecipe from "./Component/EditRecipe";
import Dashboard from "./Component/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
// const RecipeData = [
//     {id: 0, name: "pile s oriz", time: 90, portions: 6, ingredients: "pile, oriz, morkovi, sol, olio, voda", steps: "rezhesh, redish, pechesh"},
//     {id: 1, name: "pile s oriz", time: 90, portions: 6, ingredients: "pile, oriz, morkovi, sol, olio, voda", steps: "rezhesh, redish, pechesh"},
//     {id: 2, name: "pile s oriz", time: 90, portions: 6, ingredients: "pile, oriz, morkovi, sol, olio, voda", steps: "rezhesh, redish, pechesh"}
//   ];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      isLoading: false
    };
    this.RecipeList = this.RecipeList.bind(this);
    this.RecipeView = this.RecipeView.bind(this);
  }

  handleDelete(id) {
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(id));
    this.postData(`http://localhost:8080/delete-recipe`, id) // tslint:disable-next-line:no-console
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));
    this.props.history.push("/recipe-list");

    // e.preventDefault();
  }

  RecipeView({ match }) {
    let recipe;
    let index = parseInt(match.params.id, 10);
    let arrayLength = this.state.recipes.length;
    for (let i = 0; i < arrayLength; i++) {
      if (this.state.recipes[i].id === index) {
        recipe = this.state.recipes[i];
        break;
      }
    }
    if (!recipe) return <div>Recipe not found</div>;
    return (
      <div>
        <h2>{recipe.name}</h2>
        <br />
        <label>Time: </label>
        <br />
        {recipe.time}
        <br />
        <label>Portions: </label>
        <br />
        {recipe.portions}
        <br />
        <label>Ingredients: </label>
        <br />
        {recipe.ingredients}
        <br />
        <label>Steps: </label>
        <br />
        {recipe.steps}
        <br />
        <Link
          to={{
            pathname: "/edit-recipe/",
            state: {
              id: recipe.id,
              name: recipe.name,
              time: recipe.time,
              portions: recipe.portions,
              ingredients: recipe.ingredients,
              steps: recipe.steps
            }
          }}
        >
          <input type="button" value="Edit" />
        </Link>
        <input
          type="button"
          value="Delete"
          onClick={() => this.handleDelete(recipe.id)}
        />
      </div>
    );
  }

  RecipeList() {
    const { recipes, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        {recipes.map(i => (
          <Link
            key={i.id}
            replace={true}
            to={{
              pathname: `/${i.id}`
              // this is the trick!
              // state: { modal: true }
            }}
          >
            <p>{i.name}</p>
          </Link>
        ))}
      </div>
    );
  }
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
                  <li>
                    <NavLink className="nav-link" to="/recipe-list">
                      Recipe List
                    </NavLink>
                  </li>
                  {/* <li><Link to="/edit-recipe">Edit Recipe</Link></li> */}
                </ul>
              </div>
            </div>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/add-recipe" component={AddRecipe} />
              <Route path="/recipe-list" component={this.RecipeList} />
              <Route path="/edit-recipe" component={EditRecipe} />
              <Route path="/:id" component={this.RecipeView} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
