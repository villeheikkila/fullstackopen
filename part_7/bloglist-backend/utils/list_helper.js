const dummy = (blogs) => 1

const byLikes = (a, b) => b.likes - a.likes
const byValue = (a, b) => b.value - a.value

const authorWithGreatest = (counts) => {
    const authorValues = Object.keys(counts).map(author => ({
        author,
        value: counts[author]
    }))

    return authorValues.sort(byValue)[0]
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    return blogs.reduce((s, b) => s + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const { title, author, likes } = blogs.sort(byLikes)[0]

    return { title, author, likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const blogCount = blogs.reduce((obj, blog) => {
        if (obj[blog.author] === undefined) {
            obj[blog.author] = 0
        }

        obj[blog.author] += 1

        return obj
    }, {})

    const { author, value } = authorWithGreatest(blogCount)

    return {
        author,
        blogs: value
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const likeCount = blogs.reduce((obj, blog) => {
        if (obj[blog.author] === undefined) {
            obj[blog.author] = 0
        }
        obj[blog.author] += blog.likes

        return obj
    }, {})

    const { author, value } = authorWithGreatest(likeCount)

    return {
        author,
        likes: value
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}