const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const { initialBlogs, blogsInDb, equalTo, usersInDb } = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there are blogs saved', () => {
  beforeEach(async () => {
    await Blog.remove({})

    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('all blogs are returned as json', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.length).toBe(initialBlogs.length)  
  })

  test('blogs have identifier field id', async () => {
    const result = await api
      .get('/api/blogs')

    const oneBlog = result.body[0]
    expect(oneBlog.id).toBeDefined()
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb() 
    const blockToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blockToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb() 

    const deleted = blogsAtEnd.find(equalTo(blockToDelete))

    expect(deleted).toBe(undefined)

    expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)
  })

  test('contents of a blog can be changed', async () => {
    const blogsAtStart = await blogsInDb()
    const blockToChange = blogsAtStart[0]

    const updatedBlog = { ...blockToChange, likes: blockToChange.likes + 1} 

    await api
      .put(`/api/blogs/${blockToChange.id}`)
      .send(updatedBlog)
      .expect(200)  

    const blogsAtEnd = await blogsInDb()

    const changed = blogsAtEnd.find(equalTo(blockToChange))    
    expect(changed.likes).toBe(blockToChange.likes + 1)
  })

  describe('adding a new blog', () => {
    it ('increases the blog count', async () => {
      const newBlog = {
        author: 'Martin Fowler',
        title: 'Microservices Resource Guide',
        url: 'https://martinfowler.com/microservices/',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()  

      expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)

      const created = blogsAtEnd.find(equalTo(newBlog))

      expect(created).toBeDefined()
    })

    it('likes get default value if not set', async () => {
      const newBlog = {
        author: 'Martin Fowler',
        title: 'Microservices Resource Guide',
        url: 'https://martinfowler.com/microservices/'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)

      const blogsAtEnd = await blogsInDb()  

      const created = blogsAtEnd.find(equalTo(newBlog))

      expect(created.likes).toBe(0)        
    })

    it('blog is not added without url', async () => {
      const newBlog = {
        author: 'Martin Fowler',
        title: 'Microservices Resource Guide',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)  

      const blogsAtEnd = await blogsInDb()

      expect(blogsAtEnd.length).toBe(initialBlogs.length)   
    })

    it('blog is not added without title', async () => {
      const newBlog = {
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/microservices/'  ,      
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()

      expect(blogsAtEnd.length).toBe(initialBlogs.length)
    })    
  })
})


describe('when there is initially one user at db', async () => {
  beforeEach(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with too short password', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas', 
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('pasword minimum length 3')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })  

  test('creation fails with too short username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'he',
      name: 'Arto Hellas',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })    
})

afterAll(() => {
  mongoose.connection.close()
})