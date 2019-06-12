const blogs = [
  {
    _id: '5c745bc4cd1fb549d840d685',
    title: 'adsda',
    author: 'dasdasda',
    url: '1111111111111',
    user: { _id: '5c73dd9ccd1fb549d840d64b', username: 'hii', name: 'haa' },
    likes: 1
  },
  {
    _id: '5c73e82bcd1fb549d840d64c',
    title: 'titteli',
    author: 'authori',
    url: 'urli',
    user: { _id: '5c73dd9ccd1fb549d840d64b', username: 'saa', name: 'sii' },
    likes: 2
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
