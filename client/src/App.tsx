import * as React from 'react';
import './App.css';

import logo from './logo.svg';

interface IBeer {
  id: number;
  name: string;
}

interface IAppProps {
    state: string;
}

interface IAppState {
  beers: Array<IBeer>;
  isLoading: boolean;
}

class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      beers: [],
      isLoading: false
    };
  }
  public render() {
    const {beers, isLoading} = this.state;

      if (isLoading) {
        return <p>Loading...</p>;
      }

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div>
            <h2>Beer List</h2>
            {beers.map((beer: IBeer) =>
              <div key={beer.id}>
                {beer.name}
              </div>
            )}
          </div>
        </div>
      );
    }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/good-beers')
      .then(response => response.json())
      .then(data => this.setState({beers: data, isLoading: false}));
  }

}

export default App;
