const model = require('../models/users')
const { promisify } = require('util')
const queryParser = require('../utils/queryParser')
const jwt = require('jsonwebtoken')
const signJwt = promisify(jwt.sign)
const bcrypt = require('bcryptjs')
// ===============================================
// PROCESS USER DATA MODELS TO READ/SHOW
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

    result.userSongs = songs
    res.status(200).json(result)
  })

  promise.catch(error => {
    res.status().json()
  })
}

getUserByUsername = (req, res, next) => {
  let promise = model.getUserByUsername(req.params.username)

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    res.status().json(error)
  })
}

logInUser = async (req, res, next) => {
  let payload = req.body
  let promise = model.getUserByUsername(payload.username)
  if ((await promise.error.status) === 404) {
    return next(await promise)
  } else {
    return promise.then(async result => {
      const isValidPassword = await bcrypt.compare(
        payload.password,
        result.hashedPassword
      )

      if (isValidPassword) {
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
        const songs = await getUserSongs(result.id)
        result.token = token
        result.userSongs = songs
        delete result.hashedPassword
        res.status(200).json(result)
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
  logInUser,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser
}
