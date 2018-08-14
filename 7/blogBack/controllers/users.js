const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (body.username.length < 3 ) {
        res.status(400).json({
          error: "username must be atleast 3characters long" })
    }
    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0) {
        return res.status(400).json({ error: 'username already exists' })
    }
    const user = new User({
      username: body.username,
      name: body.name,
      adult: (body.adult || true),
      passwordHash
    })

    const savedUser = await user.save()

    res.json(User.format(savedUser))
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'something went wrong' })
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate( 'blogs', { title: 1, author: 1, url: 1, likes: 1 }) 
  res.json(users.map(User.format))
})

module.exports = usersRouter
