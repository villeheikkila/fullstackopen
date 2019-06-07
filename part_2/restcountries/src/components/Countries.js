import React from "react";
import Country from "./Country";
import CountrySimple from "./CountrySimple";

const Countries = ({ countries, newSearch, show }) => {
  const entries = countries.filter(country =>
    country.name.toUpperCase().includes(newSearch.toUpperCase())
  );

  if (entries.length >= 10) {
    return <p>Too many matches, specify another filter</p>;
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
