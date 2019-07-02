const express = require('express');

const routes = express.Router();
const userController = require('./controllers/user.controller');

routes.get('/', (req,res)=>{
    console.log('GET Method');
    res.sendStatus(200);
});
module.exports = routes;