const express = require("express")
const router = express.Router();


const {

    registerUser,
    loginUser, 
    logoutUser,
    loginPage,
    registerPage

} = require('./user.controller.js')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.get('/login', loginPage)

router.get('/register', registerPage)

module.exports = router;