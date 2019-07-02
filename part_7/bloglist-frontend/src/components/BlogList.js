import React from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'


const BlogList = (props) => {

    const notify = (message, type = 'success') => {
        props.createNotification({ message: message, type: type }, 2)
    }

    const handleCreateBlog = async (blog) => {
        newBlogRef.current.toggleVisibility()
        props.createBlog(blog)
        notify(`a new blog ${blog.title} by ${blog.author} added`, 'success')
    }

    const likeBlog = async (blog) => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        props.updateBlog(likedBlog)
        notify(`blog ${blog.title} by ${blog.author} liked!`)
    }

    const removeBlog = async (blog) => {
        const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            props.deleteBlog(blog)
            notify(`blog ${blog.title} by ${blog.author} removed!`, 'success')
        }
    }


    const newBlogRef = React.createRef()

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            <h2>blogs</h2>
            <Togglable buttonLabel='create new' ref={newBlogRef}>
                <NewBlog createBlog={handleCreateBlog} />
            </Togglable>
            <Table striped celled>
                <Table.Body>
                    {props.blogs.sort(byLikes).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell>
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    like={likeBlog}
                                    remove={removeBlog}
                                    user={props.user}
                                    creator={blog.user.username === props.user.username}
                                />
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

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedApp