import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { Container } from 'semantic-ui-react'
import Menu from './components/Menu'
import { connect } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { login, logout, setUser } from './reducers/userReducer'
import { initializeBlogs, createBlog, deleteBlog, updateBlog } from './reducers/blogReducer'
import { useField } from './hooks'
import {
    BrowserRouter as Router, Route
} from 'react-router-dom'
const App = (props) => {
    const [username] = useField('text')
    const [password] = useField('password')

    useEffect(() => {
        props.initializeBlogs()
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.setUser(user).then(blogService.setToken(user.token)
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const notify = (message, type = 'success') => {
        props.createNotification({ message: message, type: type }, 2)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await props.login({ username: username.value, password: password.value })
        if (response !== undefined) {
            notify('wrong username or password', 'error')
        }
    }

    const handleLogout = () => {
        props.logout()
        blogService.destroyToken()
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    if (props.user === null) {
        return (
            <Container>
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
            </Container>
        )
    }

    return (
        <Container>
            <Router>
                <Menu user={props.user} handleLogout={handleLogout} />
                <Notification />
                <Route exact path="/" render={() =>
                    <BlogList />
                } />
            </Router>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        blogs: state.blogs,
        user: state.user
    }
}
const mapDispatchToProps = { createNotification, initializeBlogs, createBlog, deleteBlog, updateBlog, login, setUser, logout }

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp