import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinderClient = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleAnimalChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreed
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreed() {
    if (this.state.animal) {
      petfinderClient.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({
              breeds: []
            });
          }
        })
        .catch(err => console.error(err));
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <SearchParams path="/search-params" />
            <Results path="/" />
            <Details path="/details/:id" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
