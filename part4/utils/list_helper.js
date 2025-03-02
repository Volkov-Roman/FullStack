const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const topBlog = blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])

  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes
  }
}

module.exports = { dummy, totalLikes, favoriteBlog }
