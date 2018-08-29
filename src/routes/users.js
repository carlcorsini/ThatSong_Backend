const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/songs')

// ===============================================
// GET ROUTES FOR USER PROFILE
// ===============================================

router.get('/', ctrl.getAllSongs)
router.post('/', ctrl.createSong)

module.exports = router
