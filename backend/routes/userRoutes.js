const express = require('express')
const { registerUser, login, logout } = require('../controllers/userController')
const router = express.Router()


router.post("/user/register", registerUser)
router.post("/user/login",login)
router.route('/user/logout').get(logout);

module.exports = router