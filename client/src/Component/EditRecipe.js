import * as React from 'react';
// import GiphyImage from './GiphyImage';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		// tslint:disable-next-line:no-console
		console.log("in constructor");
		const editObj = this.props.location.state;		
		// tslint:disable-next-line:no-console
		console.log(editObj);
		if(editObj != null) {
			this.state = {
				id: editObj.id,
				name: editObj.name,
				time: editObj.time,
				portions: editObj.portions,
				ingredients: editObj.ingredients,
				steps: editObj.steps
			};
		} else {
			this.state = {
				id: "",
				name: "",
				time: "",
				portions: 0,
				ingredients: "",
				steps: ""
			};
		}
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
		
		
		this.postData(`http://localhost:8080/edit-recipe`, this.state)// tslint:disable-next-line:no-console
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
		<textarea name="ingredients" type="textarea" value={this.state.ingredients} onChange={this.handleChangeIngredients}/>
		</div>
		<div>
		<label>Steps</label><br/>
		<textarea name="steps" type="textarea" value={this.state.steps} onChange={this.handleChangeSteps}/>
		</div>
		<input type="submit" value="Submit"/>
		</form>
      </div>
    );
  }
}

export default Recipe;