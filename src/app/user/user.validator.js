const {check, validationResult} = require("express-validator");
const User = require('./user.js');
const bcrypt = require('bcrypt');


validateRegistration = [
    check('email').custom(async email => {
        return await User.findOne({email:email}).then(user => {
            if(user) {
                return Promise.reject("Email already in use.");
            }
        })
    }), 
    check('username').custom(async username => {
        return await User.findOne({username:username}).then(user => {
            if(user){
                return Promise.reject("Username is taken.");
            }
        })
    }), 
    check('password').custom((password, { req }) => {
        if(password !== req.body.confirmpassword){
            throw new Error('Passwords do not match.')
        }else{
            return true;
        }
    }), 
    check('password', "Password has to be atleast 8 characters long").trim().isLength({min:8})
]


validateLogin = [
    check('username').custom(async username => {
        return await User.findOne({username:username}).then(user => {
            if(user){
                return;
            }
            else{
                return Promise.reject("User doesn't exist");
            }
        })
    }), 
    check('password').custom(async (password, {req}) => {
        //need a check password validator that checks the password against the username 
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            return Promise.reject('Incorrect Password');
        }
        
    })

]


module.exports = {
    validateRegistration,
    validateLogin
}