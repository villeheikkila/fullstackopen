import React from 'react';

const App = (props) => {
  const anecdotesInitial = props.store.getState()
  const anecdotes = [...anecdotesInitial].sort((a, b) => {
    return a.votes - b.votes
  })


  const addNote = (event) => {
    event.preventDefault()
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: event.target.anecdote.value
    })
    event.target.anecdote.value = ''
  }


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
      <form onSubmit={addNote}>
        <div><input name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App
