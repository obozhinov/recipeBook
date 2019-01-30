import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createRecipe } from "../actions/recipeActions";
import classnames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: "",
      portions: 0,
      ingredients: "",
      steps: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const newRecipe = {
      name: this.state.name,
      time: this.state.time,
      portions: this.state.portions,
      ingredients: this.state.ingredients,
      steps: this.state.steps
    };
    this.props.createRecipe(newRecipe, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="recipeForm">
        <h2 id="Link_Add_Recipe">Add Recipe</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="controlTxtInput1">Recipe Name</label>
            <input
              className={classnames("form-control", {
                "is-invalid": errors.name
              })}
              id="controlTxtInput1"
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
              id="controlTxtInput2"
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
              id="controlNumberInput1"
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
              id="controlTextarea1"
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
              id="controlTextarea2"
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
    );
  }
}
AddRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createRecipe }
)(AddRecipe);
