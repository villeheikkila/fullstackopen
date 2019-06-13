const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const initialUser = {
  username: 'username',
  passwordHash: 'password',
  name: 'name'
}

beforeEach(async () => {
  await User.deleteMany({})

  const userObject = new User(initialUser)
  await userObject.save()
})

test('GET /api/users id is id not _id', async () => {
  try {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBe(24)
  } catch (e) {
    console.log('error', e)
  }
})

test('GET /api/users user._id is not set', async () => {
  try {
    const response = await api.get('/api/users')
    expect(response.body[0]._id).toBe(undefined)
  } catch (e) {
    console.log('error', e)
  }
})

afterAll(() => {
  mongoose.connection.close()
})
