const knex = require('./db')
const uuid = require('uuid/v4')

// ===============================================
// MANAGE USER DATA
// ===============================================

getAllUsersFiltered = (orderParam, orderDirection, q) => {
  return knex('users')
    .whereRaw(`LOWER(first_name) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`Upper(first_name) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`LOWER(last_name) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`Upper(last_name) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`LOWER(blind) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`Upper(blind) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`LOWER(admin) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`Upper(admin) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`LOWER(email) LIKE ?`, [`%${q}%`])
    .orWhereRaw(`Upper(email) LIKE ?`, [`%${q}%`])
    .orderBy(orderParam, orderDirection)
}

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
  getAllUsersFiltered,
  getUserById,
  getUserByUsername,
  createUser,
  getUserSongs,
  deleteUser,
  updateUser
}
