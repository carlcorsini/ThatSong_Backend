const model = require('../models/songs')
const authenticate = require('../utils/authenticate')

getAllSongs = (req, res, next) => {
  let promise = model.getAllSongs()

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    next(error)
  })
}

createSong = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }

  let payload = req.body
  let promise = model.createSong(payload)

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    Promise.resolve('nothing')
    err = { message: 'error creating song', status: 500 }
    next(err)
  })
}

deleteSong = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }
  let id = req.params.id
  let promise = model.deleteSong(id)

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    next(error)
  })
}

module.exports = {
  getAllSongs,
  createSong,
  deleteSong
}
