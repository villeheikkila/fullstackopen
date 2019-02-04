import React from 'react'

const NewPerson = (props) => {
    return (
        <form onSubmit={props.addPerson}>
        nimi:
        <input
            value={props.newName}
            onChange={props.handleNameChange} />
            <br />
        numero:
        <input
            value={props.newNumber}
            onChange={props.handleNumberChange} />
            <br />
        <button type="submit">lisää</button>
        </form> 
    ) 
}

export default NewPerson