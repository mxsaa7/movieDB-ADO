const request = require('request');
require("dotenv").config();
const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_IMAGE_PATH = process.env.TMDB_IMAGE_PATH;


const searchMovie = ((req, res) => {
    res.render('search', {title:"Search"});
})

const getResults = ((req, res) => {
    session = req.session;
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

const getNowPlaying = ((req, res) => {
    session = req.session;
    request(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`, (error, response, body)=>{
        if(error){
            console.log("Error Message: " + error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data:data, title:"Now Playing", image_path:TMDB_IMAGE_PATH});
        }
    })
})

const getPopular = ((req, res) => {
    session = req.session;
    request(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=true`,(error, response, body) => {
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data:data, title:"Popular", image_path:TMDB_IMAGE_PATH});
        }
    })
})


module.exports = {
    getNowPlaying,
    getPopular,
    searchMovie,
    getResults
}