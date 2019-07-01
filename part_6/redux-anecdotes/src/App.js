import React from 'react';
import { vote, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotesInitial = props.store.getState()
  const anecdotes = [...anecdotesInitial].sort((a, b) => {
    return b.votes - a.votes
  })

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App
