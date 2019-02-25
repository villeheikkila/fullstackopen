import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div onClick={() => setVisible(true)}>
          {blog.title} {blog.author}
        </div>
      </div>
      <div style={showWhenVisible}>
        <div onClick={() => setVisible}>
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