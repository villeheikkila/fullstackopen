const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = input => {
    return {
        blogs: input.blogs,
        id: input.id,
        name: input.name,
        username: input.username,
    }
}

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { author: 1, title: 1, url: 1 })

    response.json(users.map(formatUser))
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, password, name } = request.body

        if (!password || password.length < 3) {
            return response.status(400).send({
                error: 'pasword minimum length 3'
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter