const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID!
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
    me: User
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
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
  ): Token
  }

  type Subscription {
  bookAdded: Book!
}    
`

const resolvers = {
    Query: {
        bookCount: () => { return Book.collection.countDocuments() },
        authorCount: () => { return Author.collection.countDocuments() },
        allBooks: async (root, args) => {
            return await Book.find({}).populate('author')
        },
        allAuthors: () => {
            return Author.find({})
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Author: {
        bookCount: (root) => {
            return Book.countDocuments({ author: root })
            // Exercise 8.5 which was not updated to use MongoDB
            // 
            // allBooks: (root, args) => {
            // let filteredBooks = books
            // if (args.author !== undefined) {
            //     filteredBooks = filteredBooks.filter(p => p.author === args.author)
            // }
            // if (args.genre !== undefined) {
            //     filteredBooks = filteredBooks.filter(p => p.genres.includes(args.genre))
            // }
            // return filteredBooks
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

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
            const book = new Book({ ...args, author: foundAuthor })

            try {
                const response = await book.save()
                pubsub.publish('BOOK_ADDED', { bookAdded: response })
                return response

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            if (!author) {
                return null
            }

            try {
                return await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true
    },
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findOne({ username: decodedToken.username })
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})