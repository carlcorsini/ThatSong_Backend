const songsQuery = require('../../queries/songs')

const getAllSongs = () => {
  songs = songsQuery.getAllSongs()

  return songs.then(result => {
    return result
  })
}

const createSong = payload => {
  song = songsQuery.createSong(payload)

  return song.then(result => {
    return result
  })
}

module.exports = {
  getAllSongs,
  createSong
}
