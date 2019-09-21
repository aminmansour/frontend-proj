import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinderClient = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class SearchParams extends React.Component {
  state = {
    location: "Seatlle, WA",
    animal: "",
    breed: "",
    breeds: []
  };

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
      <div className="search-params">
        <label htmlFor="location">
          location
          <input
            onChange={this.handleLocationChange}
            id="location"
            placeholder="Location"
            value={this.state.location}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            onChange={this.handleAnimalChange}
            id="animal"
            placeholder="Animal"
            value={this.state.animal}
            onBlur={this.handleAnimalChange}
          >
            <option value="">Select An Animal</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
            ;
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            onChange={this.handleBreedChange}
            id="breed"
            placeholder="Breed"
            value={this.state.breed}
            onBlur={this.handleBreedChange}
            disabled={this.state.animal === ""}
          >
            <option value="">Select An Breed</option>
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
            ;
          </select>
        </label>

        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
