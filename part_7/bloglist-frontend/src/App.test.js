import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    let component

    beforeEach(() => {
        component = render(
            <App />
        )
    })

    it('if no user logged, notes are not rendered', async () => {
        component.rerender(<App />)

        await waitForElement(() => component.getByText('kirjaudu'))

        expect(component.container).toHaveTextContent('kirjaudu')
        expect(component.container).toHaveTextContent('log in to application')
        expect(component.container).toHaveTextContent('käyttäjätunnus')
        expect(component.container).toHaveTextContent('salasana')
        expect(component.container).not.toHaveTextContent('Dan Abramov')
    })

    it('if no user logged, notes are not rendered2', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }

        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

        component.rerender(<App />)

        await waitForElement(() => component.getByText('create'))

        expect(component.container).not.toHaveTextContent('käyttäjätunnus')
        expect(component.container).not.toHaveTextContent('salasana')
        expect(component.container).toHaveTextContent('Dan Abramov')
        expect(component.container).toHaveTextContent('Martin Fowler')
    })
})