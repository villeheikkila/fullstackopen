import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

const Login = (props) => {
    const [username] = useField('text')
    const [password] = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await props.login({ username: username.value, password: password.value })
        if (response !== undefined) {
            props.createNotification({ message: 'wrong username or password', type: 'error' }, 2)
        }
    }

    return (
        <div>
            <h2>log in to application</h2>

            <Form onSubmit={handleLogin}>
                <div>
                    käyttäjätunnus
                    <input {...username} />
                </div>
                <div>
                    salasana
                    <input {...password} />
                </div>
                <Button type="submit">kirjaudu</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        notification: state.notification,
    }
}

const mapDispatchToProps = { createNotification, login }

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLogin