import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'titteli',
      author: 'authori',
      url: 'urli',
      user: '12345678910',
      likes: 1
    }
    mockHandler = jest.fn()
    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  it('renders its title', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('titteli')
  })

  it('renders its author', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('authori')
  })

  it('renders its likes', () => {
    const div = component.container.querySelector('.likes')

    expect(div).toHaveTextContent(1)
  })

  it('like clicked twice works ', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
