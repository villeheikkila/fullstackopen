import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { Query, ApolloConsumer } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  const handleError = (error) => {
    console.log('error: ', error);
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} result={authors}
      />

      <Books
        show={page === 'books'} result={books}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}

export default App