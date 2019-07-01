import React from 'react';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = (props) => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification store={props.store} />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App