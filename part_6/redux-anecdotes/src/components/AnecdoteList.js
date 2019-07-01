import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotesInitial = props.store.getState().anecdotes
    const anecdotes = [...anecdotesInitial].sort((a, b) => {
        return b.votes - a.votes
    })

    const voteId = (content, id) => {
        props.store.dispatch(vote(id))
        props.store.dispatch(createNotification(`you voted '${content}'`))
        setTimeout(() => {
            props.store.dispatch(deleteNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.filter(e => e.content.toLowerCase().includes(props.store.getState().filter.toLowerCase())).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteId(anecdote.content, anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
