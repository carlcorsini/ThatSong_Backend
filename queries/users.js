const knex = require('./db')
const uuid = require('uuid/v4')

// ===============================================
// MANAGE USER DATA
// ===============================================

getAllUsers = () => {
  return knex('users')
}

getUserById = id => {
  return knex('users')
    .where('id', id)
    .first()
}

getUserByUsername = username => {
  return knex('users')
    .whereRaw(`Lower(username) LIKE ?`, `%${username}%`)
    .orWhereRaw(`Upper(username) LIKE ?`, `%${username}%`)
    .first()
}

createUser = payload => {
  return knex('users')
    .insert(payload)
    .returning('*')
}

getUserSongs = id => {
  return knex('songs')
    .where('user_id', id)
    .orderBy('created_at', 'desc')
}

deleteUser = id => {
  return knex('users')
    .where('id', id)
    .del()
}

updateUser = (id, payload) => {
  return knex('users')
    .where('id', id)
    .update(payload)
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  getUserSongs,
  deleteUser,
  updateUser
}
