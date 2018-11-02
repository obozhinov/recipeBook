import * as React from 'react';
// import GiphyImage from './GiphyImage';

interface RecipeProps {
}

interface RecipeState {
  name: string;
  time: string;
  portions: number;
  ingredients: string;
  steps: string;
}

class Recipe extends React.Component<RecipeProps,RecipeState> {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			time: "",
			portions: "",
			ingredients: "",
			steps: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);		
		this.handleChangeTime = this.handleChangeTime.bind(this);
		this.handleChangePortions = this.handleChangePortions.bind(this);
		this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
		this.handleChangeSteps = this.handleChangeSteps.bind(this);
	
	} 
	handleSubmit(e) {
		// tslint:disable-next-line:no-console
		console.log("before fetch");
		
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
      <div>
        <h2 id="Recipe">Update or Delete a recipe</h2>
        <form onSubmit={this.handleSubmit}>
		<div>
		<label>Recipe Name</label>
		<input name="name" type="text" value={this.state.name} onChange={this.handleChangeName}/>
		</div>
		<div>
		<label>Time Needed</label>
		<input name="time" type="text" value={this.state.time} onChange={this.handleChangeTime}/>
		</div>
		<div>
		<label>Portions</label>
		<input name="portions" type="number" value={this.state.portions} onChange={this.handleChangePortions}/>
		</div>
		<div>
		<label>Ingredients</label>
		<input name="ingredients" type="textarea" value={this.state.ingredients} onChange={this.handleChangeIngredients}/>
		</div>
		<div>
		<label>Steps</label>
		<input name="steps" type="textarea" value={this.state.steps} onChange={this.handleChangeSteps}/>
		</div>
		<input type="submit" value="Submit"/>
		</form>
      </div>
    );
  }
}

export default Recipe;