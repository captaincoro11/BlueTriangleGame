const express = require('express');
const app = express();
const {register, login, logout, loaduser, getUsername} = require('../controller/user');
const {isAuthenticated} =require('../middleWare/userAuthentication')
  
app.get('/',(req,res)=>{
    res.status(201).json({
        message:"Hi there this is the only person to do this job"
    })
});

app.post('/register',register);
app.post('/login',login);
app.post('/logout',logout);
app.get('/getUsername',isAuthenticated,getUsername);
app.get('/loadUser', isAuthenticated,loaduser);

module.exports = app;