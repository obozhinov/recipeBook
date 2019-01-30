import * as React from "react";
import AddRecipe from "./AddRecipe";
import RecipeItem from "./RecipeItem";
import { connect } from "react-redux";
import { getRecipes } from "../actions/recipeActions";
import PropTypes from "prop-types";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      recipes: []
    };
  }

  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    var recipes;
    if (this.props.recipe.recipes != null) {
      recipes = this.props.recipe.recipes;
    } else {
      recipes = this.state.recipes;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Recipes</h1>

              <br />
              <hr />
              {recipes.map(recipe => (
                <RecipeItem recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  recipe: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(Dashboard);
