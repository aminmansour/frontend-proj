import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading: true,
    showModal: true
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  componentDidMount() {
    petfinder.pet
      .get({ output: "full", id: this.props.id })
      .then(data => {
        const pet = data.petfinder.pet;
        let bread;
        if (Array.isArray(pet.breeds.breed)) {
          bread = pet.breeds.breed.join(", ");
        } else {
          bread = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          bread,
          loading: false
        });
        console.log("hi it worked" + data);
      })
      .catch(err => {
        navigate("/");
        this.setState({ error: err });
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const {
      name,
      showModal,
      media,
      animal,
      bread,
      location,
      description
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal}-{bread}-{location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}!</h1>
              <button className="modal-button" onClick={this.toggleModal}>
                Yes
              </button>
              <button className="modal-button" onClick={this.toggleModal}>
                No
              </button>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
