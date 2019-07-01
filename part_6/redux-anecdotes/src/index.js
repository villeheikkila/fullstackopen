import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import reducer from './reducers/reducer'
import { Provider } from 'react-redux'
import anecdotesService from './services/anecdotes'

const store = createStore(reducer)

anecdotesService.getAll().then(anecdotes => anecdotes.forEach(anecdote => {
  store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote }
  )
}))


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)