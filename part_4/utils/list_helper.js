const dummy = blogs => {
  return 1
}
const totalLikes = blogs => {
  return blogs.reduce((total, blogi) => total + blogi.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

const mostBlogs = blogs => {
  const result = blogs.reduce((a, b) => {
    let known = a.find(found => {
      return found.author === b.author
    })

    if (!known) {
      return a.concat({ author: b.author, blogs: 1 })
    }

    known.blogs++
    return a
  }, [])

  return result.reduce((a, b) => (a.blogs > b.blogs ? a : b))
}

const mostLikes = blogs => {
  const result = blogs.reduce((a, b) => {
    let known = a.find(found => {
      return found.author === b.author
    })

    if (!known) {
      return a.concat({ author: b.author, likes: b.likes })
    }

    known.likes += b.likes
    return a
  }, [])

  return favoriteBlog(result)
}
module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  favoriteBlog
}
