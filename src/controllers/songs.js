const model = require('../models/songs')
const queryParser = require('../utils/queryParser')

getAllSongs = (req, res, next) => {
  let promise = model.getAllSongs()

  promise.then(result => {
    res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    res.status().json()
  })
}

createSong = (req, res, next) => {
  console.log(req.body)
  let payload = req.body
  let promise = model.createSong(payload)

  promise.then(result => {
    res.status(201).json(result)
  })

  promise.catch(error => {
    // console.log(error)
    res.status().json()
  })
}

module.exports = {
  getAllSongs,
  createSong
}
