import React from 'react'

const FilterPerson = (props) => {
    return (
        <form>
        rajaa näytettäviä
        <input
            value={props.newSearch}
            onChange={props.handleSearchChange} />
            <br />
        </form> 
    ) 
}

export default FilterPerson