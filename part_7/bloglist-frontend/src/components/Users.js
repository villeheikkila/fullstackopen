import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Users = (props) => {
    return (
        <div>
            <h1>Users</h1>
            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Number of blogs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.users.map(user =>
                        <Table.Row key={user.id}>
                            <Table.Cell >
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </Table.Cell>
                            <Table.Cell >
                                {user.blogs.length}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const ConnectedUsers = connect(mapStateToProps)(Users)
export default ConnectedUsers