import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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
    const user = {
      username: 'moi'
    }

    let setUpdate

    mockHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        setUpdate={setUpdate}
        user={user}
        onClick={mockHandler}
      />
    )
  })

  it('renders its title', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('titteli')
  })

  it('renders its author', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('authori')
  })

  it('click shows more', () => {
    const button = component.getByText('titteli authori')
    fireEvent.click(button)
    const div = component.container.querySelector('.titleauthorlikedelete')

    expect(div).toHaveTextContent(
      'titteli urli 1 likeslikeadded by authoriremove'
    )
  })
})
