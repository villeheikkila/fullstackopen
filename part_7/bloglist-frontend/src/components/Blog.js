import React from 'react'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { Button } from 'semantic-ui-react'

const Blog = (props) => {
    if (props.blog === undefined) {
        return null
    }

    const { blog } = props

    const likeBlog = async (blog) => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        props.updateBlog(likedBlog)
        props.createNotification({ message: `blog ${blog.title} by ${blog.author} liked!`, type: 'success' }, 2)

    }

    const removeBlog = async (blog) => {
        const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            props.deleteBlog(blog)
            props.createNotification({ message: `blog ${blog.title} by ${blog.author} removed!`, type: 'success' }, 2)
        }
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes} likes <Button onClick={() => likeBlog(blog)}>like</Button>
            <div>added by {blog.user.name}</div>
            {blog.user.username === props.user.username ? (<Button onClick={() => removeBlog(blog)}>remove </Button>) : (null)}
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

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog