import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    const promise = petfinder.pet.find({
      output: "full",
      location: "Seattle, WA"
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
  }

  handleTitleClick() {
    alert("you clicked the title");
  }

  render() {
    return (
      <div>
        {/* <h1 onClick={this.handleTitleClick}>"Adopt me!"</h1> */}
        <Pet name="luna" animal="Dog" breed="dfsd" />
        <Pet name="luna" animal="Dog" breed="dfsd" />
        <Pet name="buna" animal="Pig" breed="ddasd" />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
