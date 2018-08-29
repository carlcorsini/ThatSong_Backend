const songsQuery = require('../../queries/songs')

const getAllSongs = () => {
  songs = songsQuery.getAllSongs()
  // console.log(songs)
  return songs.then(result => {
    return result
  })
}

const createSong = payload => {
  // console.log(payload)
  song = songsQuery.createSong(payload)

  return song.then(result => {
    return result
  })
}

module.exports = {
  getAllSongs,
  createSong
}
