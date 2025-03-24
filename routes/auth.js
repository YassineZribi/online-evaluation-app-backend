const express = require('express')

const { register, login, loadUser } = require('../controllers/auth');
const User = require('../models/User');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', checkAuth, loadUser)

module.exports = router