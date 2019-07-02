import React from 'react'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
    const handleCreateBlog = async (blog) => {
        newBlogRef.current.toggleVisibility()
        props.createBlog(blog)
        props.createNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, type: 'success' }, 2)
    }

    const newBlogRef = React.createRef()

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            <h2>All blogs</h2>
            <Togglable buttonLabel='create new' ref={newBlogRef}>
                <NewBlog createBlog={handleCreateBlog} />
            </Togglable>
            <Table striped celled>
                <Table.Body>
                    {props.blogs.sort(byLikes).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
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
        notification: state.notification,
        blogs: state.blogs,
        user: state.user
    }
}
const mapDispatchToProps = { createNotification, createBlog, deleteBlog, updateBlog }

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList