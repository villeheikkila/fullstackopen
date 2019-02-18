const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blogi) => total + blogi.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}