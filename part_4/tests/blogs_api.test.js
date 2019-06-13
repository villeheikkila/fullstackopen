const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(2)
})

test('POST /api/blogs works', async () => {
  const blogsBefore = await Blog.find({})

  const newPost = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await Blog.find({})

  expect(blogsAfter.length).toBe(blogsBefore.length + 1)

  const titles = blogsAfter.map(n => n.title)
  expect(titles).toContain('Canonical string reduction')
})

test('POST /api/blogs new blogs has 0 likes if not specified', async () => {
  const newPost = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = await Blog.findById({ author: 'Edsger W. Dijkstra' })
  console.log('blogsAfter: ', blog)

  expect(blog.likes).toBe(0)
})

test('POST /api/blogs check if title is empty, 400 Bad request is returned', async () => {
  const newPost = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(400)
})

test('POST /api/blogs check if url is empty, 400 Bad request is returned', async () => {
  const newPost = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(400)
})

test('POST /api/users with too short password fails', async () => {
  const newUser = {
    username: 'Hessu',
    name: 'Edsger W. Dijkstra',
    password: 's'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('POST /api/users with too short username fails', async () => {
  const newUser = {
    username: 's',
    name: 'Edsger W. Dijkstra',
    password: 'Hesssuuuu'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('POST /api/users with too short username fails', async () => {
  const newUser = {
    name: 'Edsger W. Dijkstra'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
