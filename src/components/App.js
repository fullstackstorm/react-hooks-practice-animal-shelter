import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(event) {
    setFilters({
      ...filters,
      type: event.target.value,
    });
  }

  function handleFindPets() {
    let url = "http://localhost:3001/pets";
    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setPets(data));
  }

  function handleAdoptPet(petId) {
    const updatedPets = pets.map((pet) => {
      if (pet.id === petId) {
        return {
          ...pet,
          isAdopted: true,
        };
      }
      return pet;
    });
    setPets(updatedPets);
  }

  useEffect(() => {
    handleFindPets();
  }, []); // Fetch pets on initial component mount

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPets}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={handleAdoptPet} pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
