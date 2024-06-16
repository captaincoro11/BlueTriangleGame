const express = require('express');
const { isAuthenticated } = require('../middleWare/userAuthentication');
const { newGameSession, updateScore, fetchLeaderBoard, getAllGames } = require('../controller/game');
const app = express();

app.get('/',isAuthenticated,(req,res)=>{
    res.status(201).json({
        message:"Hi there this is the only game to do this job"
    })
});

app.post('/newGameSession',isAuthenticated,newGameSession);

app.get('/getAllGames',isAuthenticated,getAllGames)





module.exports = app;