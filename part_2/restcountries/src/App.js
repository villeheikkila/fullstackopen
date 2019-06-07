import React, { useEffect, useState } from "react";
import getAll from "./services/restCountries";
import FilterCountries from "./components/FilterCountries";
import Countries from "./components/Countries";

function App() {
  const [newSearch, setNewSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
  };

  const show = event => {
    console.log(event.target.value.name);
  };

  useEffect(() => {
    getAll().then(response => setCountries(response));
  }, []);

  return (
    <div>
      <FilterCountries
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <Countries countries={countries} newSearch={newSearch} show={show} />
    </div>
  );
}

export default App;
