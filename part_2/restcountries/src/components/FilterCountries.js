import React from "react";

const FilterCountries = ({ newSearch, handleSearchChange }) => {
  return (
    <form>
      find countries
      <input value={newSearch} onChange={handleSearchChange} />
      <br />
    </form>
  );
};

export default FilterCountries;
