import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.store.dispatch(createAnecdote(content))
        props.store.dispatch(createNotification(`you added anecdote '${content}'`))
        setTimeout(() => {
            props.store.dispatch(deleteNotification())
        }, 5000)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
