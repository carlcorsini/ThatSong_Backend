const songsQuery = require('../../queries/songs')

const getAllSongs = () => {
  songs = songsQuery.getAllSongs()

  return songs.then(result => {
    return result.length < 1
      ? { error: 'error retreiving songs', status: 404 }
      : result
  })
}

const createSong = payload => {
  song = songsQuery.createSong(payload)

  return song.then(result => {
    return !result ? { error: 'error creating song', status: 404 } : result
  })
}

const deleteSong = id => {
  song = songsQuery.deleteSong(id)

  return song.then(result => {
    return !result ? { error: 'error deleting song', status: 404 } : result
  })
}

module.exports = {
  getAllSongs,
  createSong,
  deleteSong
}
