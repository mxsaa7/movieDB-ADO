const express = require("express")
const validator = require('./user.validator');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');


const {

    registerUser,
    loginUser, 
    logoutUser,
    loginPage,
    registerPage

} = require('./user.controller.js')

router.route('/register').post(validator.validateRegistration, registerUser)

router.route('/login').post(validator.validateLogin, loginUser)

router.get('/logout', logoutUser)

router.get('/login', loginPage)

router.get('/register', registerPage)

module.exports = router;