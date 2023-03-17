const express = require('express');
const path = require('path');
const router = express.Router()
const request = require('request');
const morgan = require('morgan');
const api_route = require("./api.routes.js")
require("dotenv").config();

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('tiny'))
app.use('/api', api_route);

app.use(express.static('public'));

const SERVER_PORT = process.env.PORT

app.listen(SERVER_PORT, ()=>{
    console.log(`Server started on port: ${SERVER_PORT}`);
})


app.get('/', (req, res) => {
    res.render('search', {title:"Home"});
})


app.get('/result', (req, res)=>{
    let query = req.query.search;
    request(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=` + query, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data:data, querySearch: query, title:"Results", image_path: TMDB_IMAGE_PATH});
        }
    })
})


app.get('/popular', (req, res)=>{
    request(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=true`,(error, response, body) => {
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data:data, title:"Popular"});
        }
    })
})

app.get('/nowplaying', (req, res) => {
    request(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`, (error, response, body)=>{
        if(error){
            console.log("Error Message: " + error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data:data, title:"Now Playing"});
        }
    })
})

module.exports = {app, path, morgan, express, router};