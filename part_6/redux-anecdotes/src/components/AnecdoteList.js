import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {
    const anecdotesInitial = props.visibleAnecdotes
    const anecdotes = [...anecdotesInitial].sort((a, b) => {
        return b.votes - a.votes
    })

    const voteId = (content, id) => {
        props.vote(id)
        props.createNotification(`you voted '${content}'`)
        setTimeout(() => {
            props.deleteNotification()
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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
    if (filter === '') {
        return anecdotes
    } else {
        return anecdotes.filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))
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
