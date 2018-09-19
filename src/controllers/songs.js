const model = require('../models/songs')
const queryParser = require('../utils/queryParser')

getAllSongs = (req, res, next) => {
  let promise = model.getAllSongs()

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    res.status().json()
  })
}

createSong = (req, res, next) => {
  let payload = req.body
  let promise = model.createSong(payload)

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    next(error)
  })
}

deleteSong = (req, res, next) => {
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
