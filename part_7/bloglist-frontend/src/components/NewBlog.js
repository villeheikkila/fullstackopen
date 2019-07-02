import React from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'semantic-ui-react'

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

    const style = {
        backgroundColor: '#EA7171',
        color: '#fff',
        margin: '5px 0px'
    }

    return (
        <div>
            <h2>create new</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>title:</label>
                    <input {...title} />
                </Form.Field>
                <Form.Field>
                    <label>author:</label>
                    <input {...author} />
                </Form.Field>
                <Form.Field>
                    <label>url:</label>
                    <input {...url} />
                </Form.Field>
                <Button style={style} type='submit'>create</Button>
            </Form>
        </div>
    )
}

export default NewBlog