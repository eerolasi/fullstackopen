const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (!user) {
    return response.status(403).json({ error: 'user missing' })
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if (blog.user && user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'user not authorized' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  )

  await user.save()

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = {
    title,
    author,
    url,
    likes,
  }

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      { new: true }
    ).populate('user', { username: 1, name: 1 })
    response.json(result.toJSON())
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

router.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment) {
    return response.status(400).json({ error: 'comment missing' })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    blog.comments = blog.comments.concat(comment)
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})
module.exports = router
