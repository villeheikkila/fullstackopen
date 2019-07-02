import React from 'react'
import { Table } from 'semantic-ui-react'

const User = (props) => {
    if (props.user === undefined) {
        return null
    }

    return (
        <div>
            <h1>props.name</h1>
            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Added blogs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.user.blogs.map(blog =>
                        <Table.Row key={blog.title}>
                            <Table.Cell >
                                {blog.title}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

export default User