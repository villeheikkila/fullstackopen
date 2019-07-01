import React from 'react';
import { vote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {
    const anecdotesInitial = props.store.getState().anecdotes
    const anecdotes = [...anecdotesInitial].sort((a, b) => {
        return b.votes - a.votes
    })

    const voteId = (id) => {
        props.store.dispatch(vote(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteId(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
