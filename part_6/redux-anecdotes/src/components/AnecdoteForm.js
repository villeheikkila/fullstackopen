import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdote(content)
        props.createNotification(`you added anecdote '${content}'`)
        setTimeout(() => {
            props.deleteNotification()
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

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = { createAnecdote, createNotification, deleteNotification }

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
