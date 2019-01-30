import React, { Component } from "react";

class RecipeItem extends Component {
  render() {
    const recipe = this.props.recipe;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8 pd-2">
              <h5 className="card-title">{recipe.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Time needed: {recipe.time}
              </h6>
              <p className="card-text">{recipe.steps}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeItem;
