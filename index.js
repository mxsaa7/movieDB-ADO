const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api_route = require("./src/api/api.routes.js")
const flash = require('connect-flash')
require("dotenv").config();


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(flash());

app.use(express.json());
app.use("/tmdb", api_route);

const SERVER_PORT = process.env.PORT

app.listen(SERVER_PORT, ()=>{
    console.log(`Server started on port: ${SERVER_PORT}`);
})

app.get('/', (req, res) => {
    res.render('search', {title:"Home"});
})


module.exports = {app, path, morgan, express};