import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { Container } from 'semantic-ui-react'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Users from './components/Users'
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
    BrowserRouter as Router, Route
} from 'react-router-dom'

const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()
        props.initializeUsers()
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.setUser(user).then(blogService.setToken(user.token)
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

    if (props.user === null) {
        return (
            <Container>
                <Notification />
                <Login />
            </Container>
        )
    }

    return (
        <Container>
            <Router>
                <NavBar />
                <Notification />
                <Route exact path="/" render={() =>
                    <BlogList />
                } />
                <Route exact path="/users" render={() =>
                    <Users />
                } />
            </Router>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = { initializeBlogs, initializeUsers, setUser }

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp