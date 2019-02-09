import * as React from "react";
import { Link } from "react-router-dom";
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
  GridLayout = props => (
    <div
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        gridAutoRows: "minMax(100px, auto)"
      }}
    >
      {this.props.recipes.map(recipe => (
        <div>
          <RecipeItem recipe={recipe} />
        </div>
      ))}
    </div>
  );
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
            <div className="col-md-12 m-auto">
              <h1 className="display-4 text-center">Recipes</h1>
              <br />
              <Link to="/add-recipe" className="btn btn-lg btn-info">
                Create Recipe
              </Link>
              <br />
              <hr />
              {recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} />
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
