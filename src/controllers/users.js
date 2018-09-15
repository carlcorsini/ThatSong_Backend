const model = require('../models/users')
const { promisify } = require('util')
const queryParser = require('../utils/queryParser')
const jwt = require('jsonwebtoken')
const signJwt = promisify(jwt.sign)
const bcrypt = require('bcryptjs')

// ===============================================
// USER CONTROLLERS
// ===============================================

getAllUsers = (req, res, next) => {
  let promise = model.getAllUsers()

  promise.then(result => {
    res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    res.status().json()
  })
}

getUserById = async (req, res, next) => {
  let promise = model.getUserById(req.params.id)

  promise.then(async result => {
    const songs = await getUserSongs(req.params.id)
    const friends = await getUserFriends(result.id)

    result.userSongs = songs
    result.friends = friends
    res.status(200).json(result)
  })

  promise.catch(error => {
    res.status().json()
  })
}

getUserByUsername = (req, res, next) => {
  let promise = model.getUserByUsername(req.params.username.toLowerCase())

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    res.status().json(error)
  })
}

loginUser = async (req, res, next) => {
  let payload = req.body
  // find user in database using username off of payload
  let promise = await model.getUserByUsername(payload.username.toLowerCase())

  if (promise.error) {
    // if no match, return eror
    console.log('no user found')
    next(await promise)
    return
  } else {
    console.log('user found')
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
      const timeExpires = timeIssued + 86400 * 14
      const token = await signJwt(
        {
          iss: 'thatSong',
          aud: 'thatSong',
          iat: timeIssued,
          exp: timeExpires,
          identity: promise.id
        },
        'secret'
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

createUser = (req, res, next) => {
  let payload = req.body
  let promise = model.createUser(payload)

  promise.then(result => {
    res.status(201).json(result)
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

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser
}
