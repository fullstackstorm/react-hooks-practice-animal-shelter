import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  const handleAdoptClick = (petId) => {
    onAdoptPet(petId);
  };

  const petCards = pets.map((pet) => (
    <Pet key={pet.id} pet={pet} onAdoptPet={handleAdoptClick} />
  ));

  return <div className="ui cards">{petCards}</div>;
}

export default PetBrowser;
