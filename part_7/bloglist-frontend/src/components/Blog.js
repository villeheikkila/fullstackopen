import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Blog = ({ blog, like, remove, creator }) => {
    const [expanded, setExpanded] = useState(false)

    const details = () => (
        <div className='details'>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes
                <Button onClick={() => like(blog)}>like</Button>
            </div>
            <div>added by {blog.user.name}</div>
            {creator && (<Button onClick={() => remove(blog)}>remove </Button>)}
        </div>
    )

    return (
        <div>
            <div onClick={() => setExpanded(!expanded)} className='name'>
                {blog.title} {blog.author}
            </div>
            {expanded && details()}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    creator: PropTypes.bool.isRequired
}

export default Blog