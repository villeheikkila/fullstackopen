import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog, updateBlog } from './reducers/blogReducer'
import { useField } from './hooks'

const App = (props) => {
    const [username] = useField('text')
    const [password] = useField('password')
    const [user, setUser] = useState(null)

    useEffect(() => {
        props.initializeBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const notify = (message, type = 'success') => {
        props.createNotification({ message: message, type: type }, 2)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            notify('wrong username of password', 'error')
        }
    }

    const handleLogout = () => {
        setUser(null)
        blogService.destroyToken()
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    const handleCreateBlog = async (blog) => {
        newBlogRef.current.toggleVisibility()
        props.createBlog(blog)
        notify(`a new blog ${blog.title} by ${blog.author} added`, "success")
    }

    const likeBlog = async (blog) => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        props.updateBlog(likedBlog)
        notify(`blog ${blog.title} by ${blog.author} liked!`)
    }

    const removeBlog = async (blog) => {
        const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            props.deleteBlog(blog)
            notify(`blog ${blog.title} by ${blog.author} removed!`, "success")
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>

                <Notification />

                <form onSubmit={handleLogin}>
                    <div>
                        käyttäjätunnus
            <input {...username} />
                    </div>
                    <div>
                        salasana
            <input {...password} />
                    </div>
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        )
    }

    const newBlogRef = React.createRef()

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>

            <Togglable buttonLabel='create new' ref={newBlogRef}>
                <NewBlog createBlog={handleCreateBlog} />
            </Togglable>

            {props.blogs.sort(byLikes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    like={likeBlog}
                    remove={removeBlog}
                    user={user}
                    creator={blog.user.username === user.username}
                />
            )}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        blogs: state.blogs
    }
}
const mapDispatchToProps = { createNotification, initializeBlogs, createBlog, deleteBlog, updateBlog }

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp