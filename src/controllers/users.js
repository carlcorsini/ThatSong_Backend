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
  let promise = model.getUserByUsername(payload.username.toLowerCase())
  if ((await promise.error.status) === 404) {
    // if no match, return eror
    return next(await promise)
  } else {
    // if user found, compare payload password with result from getByUsername
    return promise.then(async result => {
      const isValidPassword = await bcrypt.compare(
        payload.password,
        result.hashedPassword
      )

      if (isValidPassword) {
        // if password is valid omit password from user body
        delete result.hashedPassword
        // create JWT token
        result.isLoggedIn = true
        const timeIssued = Math.floor(Date.now() / 1000)
        const timeExpires = timeIssued + 86400 * 14
        const token = await signJwt(
          {
            iss: 'thatSong',
            aud: 'thatSong',
            iat: timeIssued,
            exp: timeExpires,
            identity: result.id
          },
          'secret'
        )
        // once token is created find user's songs and friends
        const songs = await getUserSongs(result.id)
        const friends = await getUserFriends(result.id)
        // attach token, songs and friends to response body
        result.token = token
        result.userSongs = songs
        result.friends = friends

        res.status(200).json(result)

        return result
      } else {
        next({ error: 'username or password not found', status: 404 })
      }
    })
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
