import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {
    const anecdotesInitial = props.anecdotes
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
            {anecdotes.filter(e => e.content.toLowerCase().includes(props.filter.toLowerCase())).map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdoteList
