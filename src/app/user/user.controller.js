const request = require('request');
const User = require('./user.js');
const express = require("express");



const registerUser = ((req, res) => {
   const { name, username, email, password } = req.body;
   console.log("Hi " + name);
})

const loginUser = ((req, res) => {
    res.json("heloo");
})



module.exports = {
    registerUser,
    loginUser
}