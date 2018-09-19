const friendsQuery = require('../../queries/friends')

const createFriend = payload => {
  friend = friendsQuery.createFriend(payload)

  return friend.then(result => {
    return result.length < 1
      ? { error: 'friendship was not created', status: 404 }
      : result
  })
}

const deleteFriend = payload => {
  friend = friendsQuery.deleteFriend(payload)

  return friend.then(result => {
    return result.length < 1
      ? { error: 'no relationship found', status: 404 }
      : result
  })
}

module.exports = {
  createFriend,
  deleteFriend
}
