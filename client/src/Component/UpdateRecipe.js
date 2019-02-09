import * as React from "react";
import { getRecipe, createRecipe } from "../actions/recipeActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateRecipe extends React.Component {
  constructor(props) {
    super(props);
    // const editObj = this.props.location.state;
    this.state = {
      id: "",
      name: "",
      time: "",
      portions: "",
      ingredients: "",
      steps: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const updatedRecipe = {
      id: this.state.id,
      name: this.state.name,
      time: this.state.time,
      portions: this.state.portions,
      ingredients: this.state.ingredients,
      steps: this.state.steps
    };

    this.props.createRecipe(updatedRecipe, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, name, time, portions, ingredients, steps } = nextProps.recipe;

    this.setState({ id, name, time, portions, ingredients, steps });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRecipe(id, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto py-3">
            <h2 className="display-4 text-center">Update Recipe</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="controlTxtInput1">Recipe Name</label>
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Recipe name"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="controlTxtInput2">Time Needed</label>
                <input
                  className="form-control"
                  name="time"
                  type="text"
                  value={this.state.time}
                  onChange={this.onChange}
                  placeholder="Time needed"
                />
              </div>
              <div className="form-group">
                <label htmlFor="controlNumberInput1">Portions</label>
                <input
                  className="form-control"
                  name="portions"
                  type="number"
                  value={this.state.portions}
                  onChange={this.onChange}
                  placeholder="Portions"
                />
              </div>
              <div className="form-group">
                <label htmlFor="controlTextarea1">Ingredients</label>
                <textarea
                  className={classnames("form-control", {
                    "is-invalid": errors.ingredients
                  })}
                  name="ingredients"
                  value={this.state.ingredients}
                  onChange={this.onChange}
                  placeholder="Ingredients"
                />
                {errors.ingredients && (
                  <div className="invalid-feedback">{errors.ingredients}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="controlTextarea2">Steps</label>
                <textarea
                  className={classnames("form-control", {
                    "is-invalid": errors.steps
                  })}
                  name="steps"
                  value={this.state.steps}
                  onChange={this.onChange}
                  placeholder="Steps"
                />
                {errors.steps && (
                  <div className="invalid-feedback">{errors.steps}</div>
                )}
              </div>
              <button className="btn btn-dark" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateRecipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  createRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRecipe, createRecipe }
)(UpdateRecipe);
