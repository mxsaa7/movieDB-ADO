const express = require('express');
const path = require('path');
const request = require('request');
const morgan = require('morgan');
const mongoose = require('mongoose');
const user_route = require(path.resolve('src/app/user/user.routes.js'));
const connectDB = require(path.resolve('src/app/config/db/db.config.js'))

const api_route = require("./src/api/api.routes.js")
require("dotenv").config();


const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('tiny'))

app.use(express.static('public'));
app.use(express.json())
app.use("/tmdb", api_route)
app.use("/user", user_route);

const SERVER_PORT = process.env.PORT

app.listen(SERVER_PORT, ()=>{
    console.log(`Server started on port: ${SERVER_PORT}`);
})

connectDB();

app.get('/', (req, res) => {
    res.render('search', {title:"Home"});
})


module.exports = {app, path, morgan, express};