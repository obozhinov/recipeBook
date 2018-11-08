import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
/* import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom"; */
import AddRecipe from './Component/AddRecipe';
import EditRecipe from './Component/EditRecipe';
import Home from './Component/Home';

const RecipeData = [
    {id: 0, name: "pile s oriz", time: 90, portions: 6, ingredients: "pile, oriz, morkovi, sol, olio, voda", steps: "rezhesh, redish, pechesh"},
    {id: 1, name: "pile s oriz", time: 90, portions: 6, ingredients: "pile, oriz, morkovi, sol, olio, voda", steps: "rezhesh, redish, pechesh"},
    {id: 2, name: "pile s oriz", time: 90, portions: 6, ingredients: "pile, oriz, morkovi, sol, olio, voda", steps: "rezhesh, redish, pechesh"}
  ];
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

  handleEdit() {

  }

  handleDelete() {

  }
  componentDidMount() {
    //For testing purpouses only
    this.setState({recipes: RecipeData, isLoading: false});
    // this.setState({isLoading: true});
    fetch('http://localhost:8080/recipes')
      .then(response => response.json())
      .then(data => this.setState({recipes: data, isLoading: false}));
  }

  RecipeView({ match }) {

    let recipe;
    let index = parseInt(match.params.id, 10);
    let arrayLength = this.state.recipes.length;
    for(let i = 0; i < arrayLength; i++) {
      if(this.state.recipes[i].id === index){
        recipe = this.state.recipes[i];
        break;
      }
    }
    if (!recipe) return <div>Recipe not found</div>;
      return (
        <div> 
            <h2>{recipe.name}</h2><br/>
            <label>Time: </label><br/>{recipe.time}<br/>
            <label>Portions: </label><br/>{recipe.portions}<br/>
            <label>Ingredients: </label><br/>{recipe.ingredients}<br/>
            <label>Steps: </label><br/>{recipe.steps}<br/>
            <Link to="/edit-recipe"><input type="button" value="Edit" onClick={this.handleEdit}/></Link>
            <input type="button" value="Delete" onClick={this.handleDelete}/>
        </div>
      );
  }

  RecipeList() {
    const {recipes, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
     <div>
        {recipes.map(i => (
        <Link
          key={i.id}
          replace = {true}
          to={{
            pathname: `/${i.id}`,
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
      <Router>
      <div>
        <ul className="navigation">
			<li><NavLink exact to="/">Home</NavLink></li>
			<li><NavLink to="/add-recipe">Add Recipe</NavLink></li>
			<li><NavLink to="/recipe-list">Recipe List</NavLink></li>
			{/* <li><Link to="/edit-recipe">Edit Recipe</Link></li> */}
		</ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add-recipe" component={AddRecipe} />
          <Route path="/recipe-list" component={this.RecipeList} />
          <Route path="/edit-recipe" component={EditRecipe} />
          <Route path="/:id" component={this.RecipeView} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
