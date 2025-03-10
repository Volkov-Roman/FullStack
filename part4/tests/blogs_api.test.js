const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    }
  ]
  

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as JSON and the count is correct', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have id field instead of _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.ok(blog.id, 'Expected blog to have an "id" field')
    assert.strictEqual(blog._id, undefined, 'Expected blog._id to be undefined')
  })
})

test('successfully creates a new blog post', async () => {
  const newBlog = {
    title: "New Blog Post",
    author: "John Doe",
    url: "http://example.com/new-blog",
    likes: 15
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Fetch all blogs from DB
  const response = await api.get('/api/blogs')
  const blogs = response.body

  // Check that number of blogs increased by 1
  assert.strictEqual(blogs.length, initialBlogs.length + 1)

  // Verify that the saved blog exists in the database
  const titles = blogs.map(b => b.title)
  assert.ok(titles.includes(newBlog.title), 'Expected new blog title to be in database')
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: "Blog Without Likes",
    author: "Anonymous",
    url: "http://example.com/no-likes"
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0, 'Expected default likes to be 0')
})

after(async () => {
    await mongoose.connection.close()
  })
