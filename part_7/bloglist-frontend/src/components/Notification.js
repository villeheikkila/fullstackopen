import React from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'

const Notification = (props) => {
    if (props.notification === '') {
        return null
    }

    return (
        <Container>
            <Message success>
                {props.notification.message}
            </Message>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification