import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    const promise = petfinder.pet.find({
      output: "full",
      location: this.props.context.location,
      animal: this.props.context.animal,
      breed: this.props.context.breed
    });

    promise.then(data => {
      let pets;
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
      } else {
        pets = [];
      }
      this.setState({ pets });
    });
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>{context => <Results context={context} {...props} />}</Consumer>
  );
}
