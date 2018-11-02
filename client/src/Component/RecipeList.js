import * as React from 'react';

interface Recipe {
  id: number;
  name: string;
  time: string;
  portions: string;
  ingredients: string;
  steps: string;
}

interface RecipeListProps {
}

interface RecipeListState {
  recipes: Array<Recipe>;
  isLoading: boolean;
}

class RecipeList extends React.Component<RecipeListProps, RecipeListState> {

  constructor(props: RecipeListProps) {
    super(props);

    this.state = {
      recipes: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/recipes')
      .then(response => response.json())
      .then(data => this.setState({recipes: data, isLoading: false}));
  }

  render() {
    const {recipes, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
     <div>
        <h2 id="Link_Recipe_List">Recipe List</h2>
        {recipes.map((recipe: Recipe) =>
          <div key={recipe.id}>
            {recipe.name}
            {recipe.time}<br/>
            {recipe.portions}<br/>
            {recipe.ingredients}<br/>
            {recipe.steps}<br/>
          </div>
        )}
      </div> 
	  
	  
    );
  }
}

export default RecipeList;