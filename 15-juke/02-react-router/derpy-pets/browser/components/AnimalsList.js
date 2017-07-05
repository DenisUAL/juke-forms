import React from "react";
import AnimalCard from "./AnimalCard";

const AnimalsList = ({ animals, view }) =>
  <div className="row">
    <h4>
      {view}
    </h4>
    <div>
      {animals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
    </div>
  </div>;

export default AnimalsList;
