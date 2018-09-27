const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

// ===============================================
// GET ROUTES FOR USER PROFILE
// ===============================================

router.get('/', ctrl.getAllUsers)
router.get('/:id', ctrl.getUserById)
router.post('/login', ctrl.loginUser)
router.post('/register', ctrl.createUser)
router.delete('/:id', ctrl.deleteUser)
router.put('/:id', ctrl.updateUser)

module.exports = router
