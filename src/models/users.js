const usersQuery = require('../../queries/users')

const getAllUsersFiltered = (orderParam, orderDirection, q) => {
  users = usersQuery.getAllUsersFiltered(orderParam, orderDirection, q)
  return users.then(result => {
    return result
  })
}

const getAllUsers = (orderParam, orderDirection) => {
  users = usersQuery.getAllUsers(orderParam, orderDirection)

  return users.then(result => {
    return result
  })
}

const getUserById = id => {
  users = usersQuery.getUserById(id)

  return users.then(result => {
    return result
  })
}

module.exports = {
  getAllUsers,
  getAllUsersFiltered,
  getUserById
}
