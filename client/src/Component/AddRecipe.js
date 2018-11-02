import * as React from 'react';


interface RecipeProps {
}

interface RecipeState {
  name: string;
  time: string;
  portions: number;
  ingredients: string;
  steps: string;
}

class AddRecipe extends React.Component<RecipeProps,RecipeState> {
	constructor(props) {
		super(props);
		this.state = {
			name: "name",
			time: "name",
			portions: 0,
			ingredients: "ingredients",
			steps: "steps"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);		
		this.handleChangeTime = this.handleChangeTime.bind(this);
		this.handleChangePortions = this.handleChangePortions.bind(this);
		this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
		this.handleChangeSteps = this.handleChangeSteps.bind(this);
	
	} 
	handleSubmit(e) {
		alert('A recipe was submitted: ' + this.state.name);
		
		// tslint:disable-next-line:no-console
		this.postData(`http://localhost:8080/add-recipe`, this.state)// tslint:disable-next-line:no-console
			.then(data => console.log(JSON.stringify(data))).catch(error => console.error(error));
		e.preventDefault();
	}

	postData(url = ``, data = {}) {
  // Default options are marked with *
		return fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, cors, *same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, same-origin, *omit
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				// "Content-Type": "application/x-www-form-urlencoded",
			},
			redirect: "follow", // manual, *follow, error
			referrer: "no-referrer", // no-referrer, *client
			body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
			.then(response => response.json()); // parses response to JSON
	}
	
	handleChangeName(event) {
    this.setState({
		name: event.target.value
    });
	}
	
	handleChangeTime(event) {
    this.setState({
		time: event.target.value
    });
	}
	
	handleChangePortions(event) {
    this.setState({
		portions: event.target.value
    });
	}
	
	handleChangeIngredients(event) {
    this.setState({
		ingredients: event.target.value
    });
	}
	
	handleChangeSteps(event) {
    this.setState({
		steps: event.target.value
    });	
	}
	
	
  render() {
    return (
      <div className="recipeForm">
        <h2 id="Link_Add_Recipe">Add Recipe</h2>
        <form onSubmit={this.handleSubmit}>
		<div>
		<label>Recipe Name</label><br/>
		<input name="name" type="text" value={this.state.name} onChange={this.handleChangeName}/>
		</div>
		<div>
		<label>Time Needed</label><br/>
		<input name="time" type="text" value={this.state.time} onChange={this.handleChangeTime}/>
		</div>
		<div>
		<label>Portions</label><br/>
		<input name="portions" type="number" value={this.state.portions} onChange={this.handleChangePortions}/>
		</div>
		<div>
		<label>Ingredients</label><br/>
		<textarea name="ingredients"  value={this.state.ingredients} onChange={this.handleChangeIngredients}/>
		</div>
		<div>
		<label>Steps</label><br/>
		<textarea name="steps" value={this.state.steps} onChange={this.handleChangeSteps}/>
		</div>
		<input type="submit" value="Submit"/>
		</form>
      </div>
    );
  }
}

export default AddRecipe;