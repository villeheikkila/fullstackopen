import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [title, setTitle] = useState('')
  //const [url, setUrl] = useState('')
  //const [author, setAuthor] = useState('')
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      //setUsername('')
      //setPassword('')
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage('ulos kirjautuminen ei onnistu')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addBlog  = async (event) => {
    event.preventDefault()
    try {

      const blogObject = {
        user: user,
        title: title.value,
        author: author.value,
        url: url.value
      }

      blogService.create(blogObject).then(blog => {
        setBlogs(blogs.concat(blog))
        //setAuthor('')
        //setTitle('')
        //setUrl('')
        author.reset()
        title.reset()
        url.reset()
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    } catch (exception) {
      setErrorMessage('blogin lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        käyttäjätunnus
        <input  {...username} />
      </div>
      <div>
        salasana
        <input  {...password} />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  const blogForm = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const newBlogFrom = () => (
    <form onSubmit={addBlog}>
      <div>
      title
        <input  {...title} />
      </div>
      <div>
      author
        <input  {...author} />
      </div>
      <div>
      url
        <input  {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  )


  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{username.value} logged in</p>
          <button onClick={handleLogout}> logout</button>
          {blogForm()}
          <br />
          <Togglable buttonLabel='Create New Blog'>
            {newBlogFrom()}
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App