import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

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
    published
    genres
    author {
      name
    }
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
      author {
        name
      }
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const GET_USER = gql`{
  me {
    username
    favoriteGenre
  }
}`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(GET_USER)

  const handleError = (error) => {
    console.log('error: ', error);
  }

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      dataInStore.allPersons.push(response.data.addPerson)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      dataInStore.allPersons.push(response.data.addPerson)
      store.writeQuery({
        query: ALL_AUTHORS,
        data: dataInStore
      })
    }
  })

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'} result={authors} editAuthor={editAuthor} token={token}
        />

        <Books
          show={page === 'books'} result={books}
        />

        <Login
          show={page === 'login'} login={login} setToken={(token) => setToken(token)}
        />

      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendedBooks')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} result={authors} editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'} result={books}
      />

      <RecommendedBooks
        show={page === 'recommendedBooks'} result={books} user={user.data.me}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}

export default App