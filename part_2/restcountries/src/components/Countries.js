import React, { useState } from "react";
import Country from "./Country";
import CountrySimple from "./CountrySimple";

const Countries = ({ countries, newSearch }) => {
  const [showCountry, setShowContry] = useState();

  const show = event => {
    console.log(event.target.value);
    const cont = countries.filter(country =>
      country.name.includes(event.target.value)
    );
    console.log("cont: ", cont);
    setShowContry(cont[0]);
  };

  const entries = countries.filter(country =>
    country.name.toUpperCase().includes(newSearch.toUpperCase())
  );

  if (entries.length >= 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (showCountry !== undefined) {
    return (
      <Country
        key={showCountry.name}
        name={showCountry.name}
        capital={showCountry.capital}
        population={showCountry.population}
        languages={showCountry.languages}
        flagUrl={showCountry.flag}
      />
    );
  }
  if (entries.length > 1) {
    return (
      <ul>
        {countries
          .filter(country =>
            country.name.toUpperCase().includes(newSearch.toUpperCase())
          )
          .map(country => (
            <CountrySimple
              key={country.name}
              name={country.name}
              country={country}
              show={show}
            />
          ))}
      </ul>
    );
  }

  return (
    <ul>
      {countries
        .filter(country =>
          country.name.toUpperCase().includes(newSearch.toUpperCase())
        )
        .map(country => (
          <Country
            key={country.name}
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flagUrl={country.flag}
          />
        ))}
    </ul>
  );
};

export default Countries;
