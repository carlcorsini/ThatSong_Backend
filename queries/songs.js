const knex = require('./db')
const uuid = require('uuid/v4')

// ===============================================
// MANAGE USER DATA
// ===============================================

getAllSongs = () => {
  return knex('songs')
}

createSong = payload => {
  // console.log(payload)
  return knex('songs')
    .insert(payload)
    .returning('*')
}

module.exports = {
  getAllSongs,
  createSong
}
