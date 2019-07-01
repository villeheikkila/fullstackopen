import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const mockHandler = jest.fn()
    const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'https://cleancoder.com/first_class_tests',
        likes: 5,
        user: {
            username: 'mluukkai',
            name: 'Matti Luukkainen'
        }
    }

    beforeEach(() => {
        component = render(<Blog
            blog={blog}
            like={mockHandler}
            remove={mockHandler}
            creator={false}
        />)
    })

    test('at start only author and title shown', () => {
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).not.toHaveTextContent(blog.url)
        expect(component.container).not.toHaveTextContent('like')
    })

    test('after click', () => {
        const div = component.container.querySelector('.name')
        fireEvent.click(div)
        expect(component.container).toHaveTextContent(blog.url)
        expect(component.container).toHaveTextContent('like')
    })
})