const User = require('./user.js');
const bcrypt = require('bcrypt');
const { check, body, validationResult } = require('express-validator');


const registerUser = (async (req, res, next) => {


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
       errors.array().forEach(error => {
            req.flash('error', error.msg)
       })
       res.render('register', {errors: req.flash(), title: "Create an Account"})
       return;

    }

    const { name, username, email, password } = req.body;


    const hash_password = await bcrypt.hash(password, 10)
    User.create({
        name:name, 
        username: username, 
        email:email, 
        password:hash_password
        });
        res.redirect("/user/login");
   
   

})


const loginUser = (async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
       errors.array().forEach(error => {
            req.flash('error', error.msg)
       })
       res.render('login', {errors: req.flash(), title: "Login"})
       return;

    }

    const {username, password} = req.body;
    const user = await User.findOne({username: username});
        
    if(user){
        if(bcrypt.compare(password, user.password)){
            //generate session token
            session = req.session;
            session.username = user.username;
            session.name = user.name;
            session.email = user.email;
            session.save(function() {
                res.redirect("/");
            });
        }
    }
})


const logoutUser = (async (req, res) => {
    //Add logout functionality
    username = req.session.username;
    req.session.destroy();
    res.redirect('/');
    
})


const loginPage = (async (req, res) => {
    session = req.session;
    if(session.username){
        res.redirect('/');
    }
    else{
        res.render('login', {title: "Login"});
    }
    
})

const registerPage = (async (req, res) => {
    session = req.session;
    res.render('register', {title: "Create an Account", errors:req.session.errors});
    req.session.errors=null;
})



module.exports = {
    registerUser,
    loginUser, 
    logoutUser, 
    loginPage, 
    registerPage
}