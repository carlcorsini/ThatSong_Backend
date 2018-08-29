const knex = require('./db')
const uuid = require('uuid/v4')

// ===============================================
// MANAGE USER DATA
// ===============================================

getAllEarningsFiltered = (orderParam, orderDirection, q) => {
  return (
    knex('earnings')
      // .whereRaw(`(year) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`(month) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`LOWER(last_name) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`Upper(last_name) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`LOWER(blind) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`Upper(blind) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`LOWER(admin) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`Upper(admin) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`LOWER(email) LIKE ?`, [`%${q}%`])
      // .orWhereRaw(`Upper(email) LIKE ?`, [`%${q}%`])
      .orderBy(orderParam, orderDirection)
  )
}

getAllEarnings = (orderParam, orderDirection) => {
  return knex('earnings').orderBy(orderParam, orderDirection)
}

getEarningsByUserId = userId => {
  return knex('earnings').where('user_id', userId)
}

createEarnings = data => {
  return knex('earnings')
    .insert(data)
    .returning('*')
}

updateEarnings = (earningsId, data) => {
  return knex('earnings')
    .where('id', earningsId)
    .update(data)
    .returning('*')
}

deleteEarnings = earningsId => {
  return knex('earnings')
    .where('id', earningsId)
    .del()
    .returning('*')
}

module.exports = {
  getAllEarnings,
  getAllEarningsFiltered,
  getEarningsByUserId,
  createEarnings,
  updateEarnings,
  deleteEarnings
}
