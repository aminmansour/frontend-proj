import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };

  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                location
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  placeholder="Location"
                  value={context.location}
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  onChange={context.handleAnimalChange}
                  id="animal"
                  placeholder="Animal"
                  value={context.animal}
                  onBlur={context.handleAnimalChange}
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
                  onChange={context.handleBreedChange}
                  id="breed"
                  placeholder="Breed"
                  value={context.breed}
                  onBlur={context.handleBreedChange}
                  disabled={context.animal === ""}
                >
                  <option value="">Select An Breed</option>
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                  ;
                </select>
              </label>

              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
