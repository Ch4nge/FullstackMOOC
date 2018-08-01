const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
      id: blog._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes   
   }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})


blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if(blog.likes === undefined){
      blog.likes = 0
    }
    if(blog.title === undefined || blog.url ===undefined) {
      return response.status(400).json({error: 'url or title missing'})
    }
    const savedBlog = await blog.save()
    response.json(formatBlog(blog))
  } catch (ex){
    console.log('error')
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = blogsRouter
