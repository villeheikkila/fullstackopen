import React from 'react'
import {
    Link
} from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
    console.log('user: ', user)
    const padding = {
        paddingRight: 5
    }

    const menu = {
        background: 'darkgrey'
    }

    return (
        <div style={menu}>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/about">about</Link>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
        </div>
    )

}

export default Menu