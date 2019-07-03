const express = require('express');

const routes = express.Router();
const userController = require('./controllers/user.controller');




/**
 * Rotas Usuários
 */

/**
 * Get User list
 */
routes.get('/user/list', userService.getAll);

/**
 * Get User
 */
routes.get('/user/get/:id', userService.get);

/**
 * Create User
 */
routes.post('/user/create', requiresAdmin, userService.create);

/**
 * Remove User
 */
routes.post('/user/remove/:id',userService.remove);

/**
 * Edit User
 */
routes.post('/user/edit/:id',userService.edit);


module.exports = routes;