const express = require('express');
const path = require('path');
const request = require('request');

require("dotenv").config();

const app = express();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const SERVER_PORT = process.env.PORT;
console.log(TMDB_API_KEY);
console.log(SERVER_PORT);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('search', {title:"Home"});
})


app.listen(SERVER_PORT, ()=>{
    console.log(`Server started on port: ${SERVER_PORT}`);
})

app.get('/result', (req, res)=>{
    let query = req.query.search;
    request(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=` + query, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data:data, querySearch: query, title:"Results"});
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