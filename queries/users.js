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

getAllUsers = (orderParam, orderDirection) => {
  return knex('users').orderBy(orderParam, orderDirection)
}

getUserById = id => {
  return knex('users').where('id', id)
}

module.exports = {
  getAllUsers,
  getAllUsersFiltered,
  getUserById
}
