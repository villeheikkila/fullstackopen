const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }

   type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
    id: ID!
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
        bookCount: () => { return Book.collection.countDocuments() },
        authorCount: () => { return Author.collection.countDocuments() },
        allBooks: (root, args) => {
            let filteredBooks = Book.find({})
            if (args.author !== undefined) {
                filteredBooks = filteredBooks.filter(p => p.name === args.author)
            }
            if (args.genre !== undefined) {
                filteredBooks = filteredBooks.filter(p => p.genres.includes(args.genre))
            }
            return filteredBooks
        },
        allAuthors: () => {
            return Author.find({})
        }
    },
    Author: {
        bookCount: (root) => {
            return books.filter(p => p.author === root.name).length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const authorExists = await Author.findOne({ name: args.author })

            if (authorExists === null) {
                const author = new Author({ "name": args.author })

                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            const foundAuthor = await Author.findOne({ name: args.author })
            console.log('foundAuthor: ', foundAuthor);
            const book = new Book({ ...args, author: foundAuthor })

            try {
                const response = await book.save()
                return response
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
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