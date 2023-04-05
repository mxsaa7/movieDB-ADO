const express = require('express');
const path = require('path');
const session = require('express-session');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const user_route = require(path.resolve('src/app/user/user.routes.js'));
const connectDB = require(path.resolve('src/app/config/db/db.config.js'));
const api_route = require("./src/api/api.routes.js")
require("dotenv").config();


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: true, 
    cookie: {maxAge: 20 * 40 * 60 * 1000}, 
    resave: false
}));

app.use(express.json());
app.use("/tmdb", api_route);
app.use("/user", user_route);

const SERVER_PORT = process.env.PORT

app.listen(SERVER_PORT, ()=>{
    console.log(`Server started on port: ${SERVER_PORT}`);
})

connectDB();

app.get('/', (req, res) => {
    if(req.session){
        res.render('search', {title:"Home", session:req.session}); 
    }else{
        res.redirect('/user/login');
    }
})


module.exports = {app, path, morgan, express};