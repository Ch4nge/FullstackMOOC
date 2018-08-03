const supertest = require('supertest');
const {app, server} = require('../index');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const api = supertest(app); 


beforeAll( async () => {
  await Blog.remove({})
  const blogObjects =
    helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray) 
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('blogs are returned', async () => {
  const res = await api
    .get('/api/blogs')
  
  const contents = res.body.map(r => r.title)
  expect(contents).toContain('Go To Statement Considered Harmful')
    
})

test('valid blog can be added', async () => {
  
  const blogs = await helper.blogsInDb()
    
  const newBlog = {
    title: "Testi",
    author: "Sami",
    url: "www.testi.jotain",
    likes: 7
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
 
  const contents = blogsAfter.map(blog => blog.title)

  expect(blogsAfter.length).toBe(blogs.length+1)
  expect(contents).toContain('Testi')
}) 

test('blog without likes', async () => {
  
  const blogs = await helper.blogsInDb()
    
  const newBlog = {
    title: "Testi2",
    author: "Sami",
    url: "www.testi.jotain",
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogFromDb = await Blog.findOne({title: "Testi2"})
  console.log(blogFromDb);
  let likes = blogFromDb.likes 
  expect(likes).toBe(0)
}) 
  
test('blog without title is not added', async () => {
  
  const blogs = await helper.blogsInDb()
    
  const newBlog = {
    author: "Sami",
    url: "www.testi.jotain",
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}) 

afterAll(() => {
  server.close()
})
