import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)

    await waitForElement(() => component.container.querySelector('.login'))

    const componentBlog = await component.container.querySelectorAll('.all')
    expect(componentBlog.length).toEqual(0)
  })
})

describe('<App />', () => {
  beforeEach(() => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  })

  test('if user is logged in, blogs are rendered', async () => {
    const component = render(<App />)
    await waitForElement(() => component.container.querySelector('.all'))

    const componentBlog = await component.container.querySelectorAll('.all')
    expect(componentBlog.length).toEqual(2)
  })
})
