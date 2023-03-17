const express = require('express')
const router = express.Router()


const {
    searchMovie,
    getResults,
    getNowPlaying,
    getPopular
} = require('./api.controller.js')


router.get('/popular', getPopular);

router.get('/nowplaying', getNowPlaying)

router.get('/search', searchMovie)

router.get('/result', getResults)

module.exports = router
