const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)


mongoose.connect(config.mongoUrl)
  .then( () => {
    console.log('connect to database', config.mongoUrl)
  })
  .catch( (e) => {
    console.log(e)
  })

const PORT = config.port

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close',  () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
