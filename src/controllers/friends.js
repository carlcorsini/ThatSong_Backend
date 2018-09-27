const model = require('../models/friends')
const userModel = require('../models/users')
const authenticate = require('../utils/authenticate')

createFriend = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }

  let payload = req.body
  let promise = model.createFriend(payload)

  promise.then(async result => {
    const friends = await getUserFriends(payload.follower_id)
    result.friends = friends
    return result.error ? next(result) : res.status(201).json(result)
  })

  promise.catch(error => {
    console.log(error)
    next(error)
  })
}

deleteFriend = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }

  let payload = req.body
  console.log(payload)
  let promise = model.deleteFriend(payload)

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    next(error)
  })
}

module.exports = {
  createFriend,
  deleteFriend
}
