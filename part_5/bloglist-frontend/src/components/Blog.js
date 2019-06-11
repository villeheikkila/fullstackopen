import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, setUpdate }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const like = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    setUpdate(Math.floor(Math.random() * 100))
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div onClick={() => setVisible(true)}>
          {blog.title} {blog.author}
        </div>
      </div>
      <div style={showWhenVisible}>
        <div onClick={like}>
          {blog.title} <br />
          {blog.author} <br />
          {blog.url} <br />
          {blog.likes}
          <button type="submit">like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
