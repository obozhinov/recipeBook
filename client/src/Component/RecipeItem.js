import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class RecipeItem extends Component {
  onClickDelete = id => {
    this.props.deleteRecipe(id);
  };

  render() {
    const recipe = this.props.recipe;
    if (recipe == null) return " ";
    else
      return (
        <div className="container">
          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-lg-6 pd-2">
                <h5 className="card-title">{recipe.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Time needed: {recipe.time}
                </h6>
                <p className="card-text">{recipe.steps}</p>
              </div>
              <div className="col-md-4">
                <ul className="list-group">
                  <li>
                    <Link to={`/update-recipe/${recipe.id}`}>
                      Update recipe
                    </Link>
                  </li>
                  <li onClick={this.onClickDelete.bind(this, recipe.id)}>
                    Delete recipe
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

RecipeItem.propTypes = {
  deleteRecipe: PropTypes.func.isRequired
};

export default RecipeItem;
