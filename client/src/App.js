import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ViewRecipe from './Component/ViewRecipe';
import AddRecipe from './Component/AddRecipe';
import RecipeList from './Component/RecipeList';
import EditRecipe from './Component/EditRecipe';
import Home from './Component/Home';

class App extends Component {
  render() {
    return (
	<HashRouter>	
      <div>
		<ul className="navigation">
			<li><NavLink exact to="/">Home</NavLink></li>
			<li><NavLink to="/add-recipe">Add Recipe</NavLink></li>
			<li><NavLink to="/recipe-list">Recipe List</NavLink></li>
			<li><NavLink to="/edit-recipe">Edit Recipe</NavLink></li>
			<li><NavLink to="/view-recipe">Recipe</NavLink></li>
		</ul>
		<div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/add-recipe" component={AddRecipe}/>
            <Route path="/recipe-list" component={RecipeList}/> 
            <Route path="/edit-recipe" component={EditRecipe}/> 
            <Route path="/view-recipe" component={ViewRecipe}/> 
        </div>
      
      </div>
	</HashRouter>
    );
  }
}

export default App;
