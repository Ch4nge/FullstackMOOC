const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')


const formatBlog = (blog) => {
    return {
      id: blog._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user
   }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs.map(formatBlog))
})


blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const token = request.token
    const decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    if (!token || !decoded.id) {
      console.log("täälä1");
      return response.status(401).json({ error: 'bad token' })
    }
    if(blog.likes === undefined){
      console.log("täälä2");
      blog.likes = 0
    }
    if(blog.title === undefined || blog.url ===undefined) {
      console.log("täälä3");
      return response.status(400).json({error: 'url or title missing'})
    }


    const user = await User.findById(decoded.id)
    console.log(user);
    blog.user = user._id

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.json(savedBlog)
  } catch (ex){
    if (ex.name === 'JsonWebTokenError') {
        response.status(401).json({ error: ex.message })
    }else {
      console.log('error')
      response.status(500).json({ error: 'something went wrong' })
    }
  }
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog
      .find({_id: request.params.id})

    const token = request.token
    const decoded = jwt.verify(token, process.env.SECRET)
    if(!token || !decoded.id){
      return response.status(401).json({ error: 'bad token' })
    }
    if(decoded.id.toString() !==  blog[0].user.toString()){
      return response.status(400).json({ error: 'only creator can delete' })
    }

    await blog[0].remove()

    response.status(204).end()
  } catch (e) {
     if (e.name === 'JsonWebTokenError') {
       response.status(401).json({ error: e.message })
     }else {
        console.log(e)
        response.status(500).json({ error: 'something went wrong' }) 
     }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
   console.log(request.body);
  try {
   const blog = await Blog
      .findByIdAndUpdate(request.params.id, body, {new: true})
   response.json(formatBlog(blog))
  } catch (e) {
    console.log(e)
    res.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter
