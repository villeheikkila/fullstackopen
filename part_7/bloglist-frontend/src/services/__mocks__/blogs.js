const blogs = [
    {
        title: 'Microservices and the First Law of Distributed Objects',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/distributed-objects-microservices.html',
        user: {
            username: 'hellas',
            name: 'Arto Hellas',
            id: '5c4857b1003ad1a6e6626931'
        },
        likes: 7,
        id: '5c486996a1c337de9b1d6056'
    },
    {
        title: 'Things I Don’t Know as of 2018',
        author: 'Dan Abramov',
        url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
        user: {
            username: 'hellas',
            name: 'Arto Hellas',
            id: '5c4857b1003ad1a6e6626931'
        },
        likes: 2,
        id: '5c4869d8a1c337de9b1d6057'
    },
    {
        title: 'FP vs. OO List Processing',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2018/12/17/FPvsOO-List-processing.html',
        user: {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            id: '5c486cc56656ace2a8edfc3a'
        },
        likes: 0,
        id: '5c486ebcdb26d0e3c34a7ef8'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => { }

export default { getAll, setToken }