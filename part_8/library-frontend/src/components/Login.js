import React, { useState } from 'react'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        const result = await props.login({
            variables: { username, password }
        })

        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('token', token)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login