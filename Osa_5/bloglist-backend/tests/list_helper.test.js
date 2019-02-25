const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const oneBlog = [ blogs[0] ]

test('dummy returns 1', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('the only blog if list has only one', () => {
    const mostVotes = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    }

    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(mostVotes)
  })

  test('the one with most likes', () => {
    const mostVotes = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(mostVotes)
  }) 
  
})   

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('the only author if list has only one blog', () => {
    const mostVotes = {
      author: "Michael Chan",
      blogs: 1,
    }

    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual(mostVotes)
  })    

  test('the one with most blogs', () => {
    const mostVotes = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostVotes)
  })      
})

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })
  
  test('the only author if list has only one blog', () => {
    const mostLikes = {
      author: "Michael Chan",
      likes: 7,
    }    

    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual(mostLikes)
  })

  test('the one with most likes', () => {
    const mostVotes = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostVotes)
  })        
})