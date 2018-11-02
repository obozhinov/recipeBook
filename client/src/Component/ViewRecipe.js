import React, { Component } from 'react';


interface RecipeProps {
}

interface RecipeState {
  id: number;
  isLoading: boolean;
  isSubmitted: boolean;
}
class ViewRecipe extends Component<RecipeProps, RecipeState> {

    constructor(props: RecipeProps) {
        super(props);

        this.state = {
          id: "",
          isLoading: false,
          isSubmitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleChangeId(event) {
      this.setState({
          id: event.target.value        
      });
      alert('Id: ' + this.state.id);	
	}
  
    handleSubmit(e) {
    const data = {
      id: this.state.id
    };
    
      alert(JSON.stringify(data));
    const url = `http://localhost:8080/recipe`;
		// tslint:disable-next-line:no-console
		fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				// "Content-Type": "application/x-www-form-urlencoded",
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
			.then(response => response.json())// tslint:disable-next-line:no-console
			.then(data => console.log(JSON.stringify(data))).catch(error => console.error(error));
      e.preventDefault();
      this.setState({isSubmitted: true});
	}	

    getData() {
      fetch('http://localhost:8080/recipe')
      .then(response => response.json())
      .then(data => this.setState({recipes: data, isLoading: false}));
    }

    render() {
      const recipe = this.getData;

      if (recipe.isLoading) {
        return <p>Loading...</p>;
      }

      if(!recipe.isSubmitted) {
           return (
           <form  onSubmit={this.handleSubmit}>
              <label>Find by ID: </label>
              <input type="number" name="id" value={this.state.id} onChange={this.handleChangeId}/>
              <input type="submit" value="Submit"/>
		    </form>
           ); 
          }
      return (
        <div>
          <form  onSubmit={this.handleSubmit}>
              <label>Find by ID: </label>
              <input type="number" name="id" value={this.state.id} onChange={this.handleChangeId}/>
              <input type="submit" value="Submit"/>
		    </form>
          <div key={recipe.id}>
              <h2>{recipe.name}</h2><br/>
              <label>ID: </label>{recipe.id}<br/>
              <label>Time: </label>{recipe.time}<br/>
              <label>Portions: </label>{recipe.portions}<br/>
              <label>Ingredients: </label><br/>{recipe.ingredients}<br/>
              <label>Steps: </label><br/>{recipe.steps}<br/>
          </div>
        </div> 
      
      
      );
    }
}

export default ViewRecipe;