const express = require('express');

const routes = express.Router();
const userService = require('./services/user.service');

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
 * Params: id
 */
routes.post('/user/create', userService.create);

/**
 * Remove User
 * Params: user {object}
 *  params = {
 *      user: {
 *          name: name,
 *          email: email,
 *          phone_number: phone_number,
 *          birth_date: birth_date,
 *          cpf: cpf
 *      }
 *  }
 */
routes.post('/user/remove/:id',userService.remove);

/**
 * Edit User
 * Params: id
 */
routes.post('/user/edit/:id',userService.edit);


module.exports = routes;