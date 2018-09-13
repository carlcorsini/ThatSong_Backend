const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

// ===============================================
// GET ROUTES FOR USER PROFILE
// ===============================================

router.get('/', ctrl.getAllUsers)
router.get('/id/:id', ctrl.getUserById)
router.get('/:username', ctrl.getUserByUsername)
router.post('/login', ctrl.logInUser)
router.post('/', ctrl.createUser)
router.delete('/:id', ctrl.deleteUser)
router.put('/:id', ctrl.updateUser)

module.exports = router
