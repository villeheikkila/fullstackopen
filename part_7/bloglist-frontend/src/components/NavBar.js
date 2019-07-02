import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import blogService from '../services/blogs'
import { logout } from '../reducers/userReducer'
import { connect } from 'react-redux'

const NavBar = (props) => {
    const handleLogout = () => {
        props.logout()
        blogService.destroyToken()
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    const style = {
        color: 'white',
        fontWeight: '600'
    }

    const buttonStyle = {
        backgroundColor: '#EA7171',
        color: '#fff',
        margin: '5px 10px',
    }
    return (
        <Menu inverted>
            <Menu.Item link>
                <Link to="/">Blogs</Link>
            </Menu.Item>
            <Menu.Item link>
                <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item link>
                <em style={style}>{props.user.name} logged in </em>
                <Button style={buttonStyle} onClick={handleLogout}>logout</Button>
            </Menu.Item>
        </Menu>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        notification: state.notification,
    }
}

const mapDispatchToProps = { logout }

const ConnectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default ConnectedNavBar