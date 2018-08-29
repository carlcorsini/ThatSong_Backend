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

getUserById = (req, res, next) => {
  let promise = model.getUserById(req.params.id)

  promise.then(result => {
    res.status(200).json({
      result,
      message: `id of ${req.params.id} returned`
    })
  })

  promise.catch(error => {
    res.status().json()
  })
}

module.exports = {
  getAllUsers,
  getUserById
}
