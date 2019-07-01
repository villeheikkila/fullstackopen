import React from 'react'

const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }

    const style = {
        color: notification.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={style}>
            {notification.message}
        </div>
    )
}

export default Notification