const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs.map(b => b.toJSON()))
})

router.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    blog.user = user.id

    if (!blog.url || !blog.title) {
        return response.status(400).send({ error: 'title or url missing' }).end()
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const result = await blog.save()
    user.blogs = user.blogs.concat(blog)
    await user.save()

    response.status(201).json(result)
})

router.put('/:id', async (request, response) => {
    const { author, title, url, likes } = request.body

    const blog = {
        author, title, url, likes,
    }

    const updatedNote = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedNote.toJSON())
})

router.delete('/:id', async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id) {
        const res = await Blog.findByIdAndRemove(request.params.id)
        response.status(204).json(res).end()
    } else {
        response.status(404).end()
    }
})

module.exports = router