const model = require('../models/users')
const queryParser = require('../utils/queryParser')
// ===============================================
// PROCESS USER DATA MODELS TO READ/SHOW
// ===============================================

// getAllUsers = (req, res, next) => {
//   let query = queryParser(req.query)
//   console.log(query)
//   let { orderParam, orderDirection, q } = query
//
//   let promise = q
//     ? model.getAllUsersFiltered(orderParam, orderDirection, q)
//     : model.getAllUsers(orderParam, orderDirection)
//
//   promise.then(users => {
//     res
//       .header('Access-Control-Expose-Headers', 'Content-Range')
//       .header('Content-Range', users.length)
//       .status(200)
//       .json(users)
//   })
//
//   promise.catch(error => {
//     res.status().json()
//   })
// }
//
//
//
getAllUsers = (req, res, next) => {
  let promise = model.getAllUsers()

  promise.then(result => {
    res.status(200).json(result)
  })

  promise.catch(error => {
    console.log(error)
    res.status().json()
  })
}

getUserById = (req, res, next) => {
  let promise = model.getUserById(req.params.id)

  promise.then(result => {
    res.status(200).json(result)
  })

  promise.catch(error => {
    res.status().json()
  })
}

getUserByUsername = (req, res, next) => {
  let promise = model.getUserByUsername(req.params.username)

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    res.status().json(error)
  })
}

logInUser = async (req, res, next) => {
  // console.log(req.body)
  let payload = req.body
  let promise = model.getUserByUsername(payload.username)
  if ((await promise.error.status) === 404) {
    return next(await promise)
  } else {
    return promise.then(result => {
      console.log(result)
      console.log(payload)
      if (payload.password === result.hashedPassword) {
        result.isLoggedIn = true
        delete result.hashedPassword
        res.status(200).json(result)
      } else {
        next({ error: 'username or password not found', status: 404 })
      }
    })
  }

  promise.catch(error => {
    next(error)
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  logInUser,
  getUserByUsername
}
