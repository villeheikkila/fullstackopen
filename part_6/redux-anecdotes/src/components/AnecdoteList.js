import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {
    const voteId = (content, id) => {
        props.vote(id)
        props.createNotification(`you voted '${content}'`, 3)
    }

    return (
        <div>
            {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
    const anecdotesSorted = [...anecdotes].sort((a, b) => {
        return b.votes - a.votes
    })

    if (filter === '') {
        return anecdotesSorted
    } else {
        return anecdotesSorted.filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))
    }
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = { vote, createNotification, deleteNotification }

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
