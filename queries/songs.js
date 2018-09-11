const knex = require('./db')
const uuid = require('uuid/v4')

// ===============================================
// MANAGE USER DATA
// ===============================================

getAllSongs = () => {
  return knex('songs')
    .join('users', 'users.id', '=', 'songs.user_id')
    .select(
      'songs.id',
      'songs.title',
      'songs.user_id',
      'songs.timestamp',
      'songs.url',
      'songs.created_at',
      'songs.updated_at',
      'songs.notes',
      'users.username'
    )
    .orderBy('songs.created_at', 'desc')
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
