import React from 'react'
import { useField } from '../hooks'

const NewBlog = (props) => {
    const [title, titleReset] = useField('text')
    const [author, authorReset] = useField('text')
    const [url, urlReset] = useField('text')

    const handleSubmit = (event) => {
        event.preventDefault()
        props.createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        })
        titleReset()
        authorReset()
        urlReset()
    }

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    title:
          <input {...title} />
                </div>
                <div>
                    author:
          <input {...author} />
                </div>
                <div>
                    url:
          <input {...url} />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlog