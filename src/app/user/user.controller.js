const User = require('./user.js');
const bcrypt = require('bcrypt');


const registerUser = (async (req, res) => {
   const { name, username, email, password } = req.body;
   const user = await User.findOne({username: username});
   if(user){
    
        res.status(400).json({error: "User already exists"});

   }else{

        const hash_password = await bcrypt(password, 10)
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
        if(password === user.password){
            res.json("home");
        }else{
            res.status(400).json({error: 'Password is incorrect'});
        }
    }else{
        res.status(400).json({error: "Username or email doesn't exist"});
    }
})



module.exports = {
    registerUser,
    loginUser
}