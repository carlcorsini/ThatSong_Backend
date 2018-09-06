const knex = require('./db')
const uuid = require('uuid/v4')

// ===============================================
// MANAGE USER DATA
// ===============================================

getAllSongs = () => {
  return knex('songs').orderBy('created_at', 'desc')
}

createSong = payload => {
  return knex('songs')
    .insert(payload)
    .returning('*')
}

module.exports = {
  getAllSongs,
  createSong
}
