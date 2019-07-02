import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost'
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
    , document.getElementById('root'))