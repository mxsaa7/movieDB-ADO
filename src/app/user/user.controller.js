const User = require('./user.js');
const bcrypt = require('bcrypt');


const registerUser = (async (req, res) => {
   const { name, username, email, password } = req.body;
   const user = await User.findOne({username: username});
   if(user){
    
        res.status(400).json({error: "User already exists"});

   }else{

        const hash_password = await bcrypt.hash(password, 10)
        User.create({
            name:name, 
            username: username, 
            email:email, 
            password:hash_password
        });
        res.status(200).json({message: "Success"});
   }
   




})


const loginUser = (async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
        
    if(user){
        if(bcrypt.compare(password, user.password)){
            //generate session token
            req.session.user = {
                name: user.name,
                userid: user.id, 
                username: user.username, 
                email: user.email
            }
            res.json(req.session.user);
        }else{
            res.status(400).json({error: 'Password is incorrect'});
            //display error in the UI
        }
    }else{
        res.status(400).json({error: "Username or email doesn't exist"});
        //display error in the UI
    }
})


const logoutUser = (async (req, res) => {
    //Add logout functionality
})



module.exports = {
    registerUser,
    loginUser, 
    logoutUser
}