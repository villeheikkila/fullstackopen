import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()

  const voteId = (id) => {
    return {
      type: 'VOTE',
      data: { id }
    }
  }

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteId(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
