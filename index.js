const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000
const cors = require('cors')

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const songRoutes = require('./src/routes/songs.js')
const userRoutes = require('./src/routes/users.js')
const friendRoutes = require('./src/routes/friends.js')

app.use('/songs', songRoutes)
app.use('/users', userRoutes)
app.use('/friends', friendRoutes)

app.all('*', (req, res, next) => res.sendStatus(404))

app.use((err, req, res, next) => {
  res.status(err.status).json(err)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`That Song is playing on port ${port}!`)
  })
}

module.exports = app
