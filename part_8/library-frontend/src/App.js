import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    bookCount
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  return <Query query={ALL_AUTHORS}>
    {(result) => {
      if (result.loading) {
        return <div>loading...</div>
      }
      return (
        <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
          </div>

          <Authors
            show={page === 'authors'}
          />

          <Books
            show={page === 'books'}
          />

          <NewBook
            show={page === 'add'}
          />

        </div>
      )
    }}
  </Query>

}

export default App