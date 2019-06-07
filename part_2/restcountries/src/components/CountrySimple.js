import React, { useState } from "react";

const Country = ({ name, country, show }) => {
  return (
    <li key={name}>
      {name}
      <button value={country.name} onClick={show}>
        Show
      </button>
    </li>
  );
};

export default Country;
