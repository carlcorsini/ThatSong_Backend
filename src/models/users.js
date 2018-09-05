const usersQuery = require('../../queries/users')

const getAllUsersFiltered = (orderParam, orderDirection, q) => {
  users = usersQuery.getAllUsersFiltered(orderParam, orderDirection, q)
  return users.then(result => {
    return result
  })
}

const getAllUsers = () => {
  users = usersQuery.getAllUsers()

  return users.then(result => {
    return result
  })
}

const getUserById = id => {
  user = usersQuery.getUserById(id)

  return user.then(result => {
    return result
  })
}

const getUserByUsername = username => {
  user = usersQuery.getUserByUsername(username)
  return user.then(result => {
    return !result
      ? { error: 'username or password incorrect', status: 404 }
      : result
  })
}

const logInUser = payload => {
  user = usersQuery.logInUser(payload)

  return user.then(result => {
    return result
  })
}

module.exports = {
  getAllUsers,
  getAllUsersFiltered,
  getUserById,
  logInUser,
  getUserByUsername
}
