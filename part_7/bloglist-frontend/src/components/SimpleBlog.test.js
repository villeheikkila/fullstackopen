import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


describe('<SimpleBlog />', () => {
    let component
    let mockHandler
    const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 5
    }

    beforeEach(() => {
        mockHandler = jest.fn()
        component = render(
            <SimpleBlog blog={blog} onClick={mockHandler} />
        )
    })

    test('shows the blog content', () => {
        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`)
    })

    test('if button like pressed twice, handler is called on both times', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
