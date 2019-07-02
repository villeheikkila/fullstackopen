const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: String!
  }

   type Book {
    title: String
    author: String
    published: String 
    genres: [String]
  }

  type Query {
    hello: String!
    bookCount: String!
    authorCount: String!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(    
        name: String!    
        setBornTo: Int!  
    ): Author
  }
`

const resolvers = {
    Query: {
        hello: () => { return "world" },
        bookCount: () => { return books.length },
        authorCount: () => { return authors.length },
        allBooks: (root, args) => {
            let filteredBooks = books
            if (args.author !== undefined) {
                filteredBooks = filteredBooks.filter(p => p.name === args.author)
            }
            if (args.genre !== undefined) {
                filteredBooks = filteredBooks.filter(p => p.genres.includes(args.genre))
            }
            return filteredBooks
        },
        allAuthors: () => {
            return authors
        }
    },
    Author: {
        bookCount: (root) => {
            return books.filter(p => p.author === root.name).length
        }
    },
    Mutation: {
        addBook: (root, args) => {
            const book = { ...args, id: uuid() }
            const authorExists = authors.find(a => a.name === args.author)

            if (authorExists === undefined) {
                const author = { id: uuid(), "name": args.author, "born": null }
                authors = authors.concat(author)
            }

            books = books.concat(book)
            return book
        },
        editAuthor: (root, args) => {
            const author = authors.find(p => p.name === args.name)

            if (!author) {
                return null
            }

            const updatedAuthor = { ...author, born: args.setBornTo }
            authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
            return updatedAuthor
        }
    }
}

const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true
    },
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})