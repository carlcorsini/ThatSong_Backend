const model = require('../models/users')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const signJwt = promisify(jwt.sign)
const bcrypt = require('bcryptjs')
const authenticate = require('../utils/authenticate')
const env = require('../../env')

// ===============================================
// USER CONTROLLERS
// ===============================================

getAllUsers = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }

  let promise = model.getAllUsers()

  promise.then(result => {
    res.status(200).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

getUserById = async (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }

  let promise = model.getUserById(req.params.id)
  let { message } = await promise
  if (message == 'user not found') {
    return next(await promise)
  }

  promise.then(async result => {
    delete result.hashedPassword
    const songs = await getUserSongs(req.params.id)
    const friends = await getUserFriends(result.id)
    result.userSongs = songs
    result.friends = friends

    res.status(200).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

getUserByUsername = (req, res, next) => {
  let promise = model.getUserByUsername(req.params.username.toLowerCase())

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

loginUser = async (req, res, next) => {
  let payload = req.body
  // find user in database using username off of payload
  let promise = await model.getUserByUsername(payload.username.toLowerCase())

  if (promise.error) {
    // if no match, return eror
    next(promise)

    return
  } else {
    // if user found, compare payload password with result from getByUsername
    const isValidPassword = await bcrypt.compare(
      payload.password,
      promise.hashedPassword
    )

    if (isValidPassword) {
      // if password is valid omit password from user body
      delete promise.hashedPassword
      // create JWT token
      promise.isLoggedIn = true
      const timeIssued = Math.floor(Date.now() / 1000)
      const timeExpires = timeIssued + 86400 * 28
      const token = await signJwt(
        {
          iss: 'thatSong',
          aud: 'thatSong',
          iat: timeIssued,
          exp: timeExpires,
          identity: promise.id
        },
        env.JWT_KEY
      )
      // once token is created find user's songs and friends
      const songs = await getUserSongs(promise.id)
      const friends = await getUserFriends(promise.id)
      // attach token, songs and friends to response body
      promise.token = token
      promise.userSongs = songs
      promise.friends = friends

      res.status(200).json(promise)

      return promise
    } else {
      next({ error: 'username or password not found', status: 404 })
    }
  }

  promise.catch(error => {
    next(error)
  })
}

createUser = async (req, res, next) => {
  let payload = req.body

  payload.profile_pic =
    'https://cdn1.iconfinder.com/data/icons/ios-edge-line-12/25/User-Square-512.png'

  let doesUsernameExist = await model.getUserByUsername(
    payload.username.toLowerCase()
  )

  let doesEmailExist = await model.getUserByUsername(
    payload.email.toLowerCase()
  )

  if (doesEmailExist.email) {
    return next({ error: 'that email is taken', status: '404' })
  }

  if (doesUsernameExist.username) {
    return next({ error: 'that username is taken', status: '404' })
  }

  let promise = model.createUser(payload)

  promise.then(result => {
    delete result[0].hashedPassword
    return result.error ? next(result) : res.status(201).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

deleteUser = (req, res, next) => {
  let id = Number(req.params.id)

  let promise = model.deleteUser(id)

  promise.then(result => {
    res.status(201).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

updateUser = (req, res, next) => {
  let id = Number(req.params.id)
  let payload = req.body
  let promise = model.updateUser(id, payload)

  promise.then(result => {
    res.status(201).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

token = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }
  res.status(200).json({ message: 'token valid' })
}

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser,
  token
}
