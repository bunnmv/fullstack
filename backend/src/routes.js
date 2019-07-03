const express = require('express');
const userService = require('./services/user.service');
const addressService = require('./services/address.service');
const phoneService = require('./services/phone.service');
const routes = express.Router();

/**
 * User routes
 */

// Get User list
routes.get('/user/list', userService.getAll);

// Get User
routes.get('/user/get/:id', userService.get);

/**
 * Create User
 * Params: user {object}
 *  Ex:
 *  params = {
 *      user: {
 *          name: string,
 *          email: string,
 *          phone_number: string,
 *          birth_date: date,
 *          cpf: string
 *      }
 *  }
 */

routes.post('/user/create', userService.create);

/**
 * Remove User
 * Params:
 * id : User ID
 */
routes.post('/user/remove/:id',userService.remove);

/**
 * Edit User
 *  id : User ID
 *  params = user {object}
 *  Ex:
 *  params = {
 *      user: {
 *          name: string,
 *          email: string,
 *          phone_number: string,
 *          birth_date: date,
 *          cpf: string
 *      }
 *  }
 */
routes.post('/user/edit/:id',userService.edit);

/**
 * Address routes
 */


/**
 * Create Address for User
 *  user : User ID
 *  params = user {object}
 *  Ex:
 *  params = {
 *      address: {
 *          street: string,
 *          neighborhood: string,
 *          zip_code: string,
 *          city: string,
 *          state: string
 *          number: string
 *      }
 *  }
 */
routes.post('/user/:user/address/create', addressService.create);

/**
 * Edit Address for User
 *  user : User ID
 *  id : Address ID
 *  params = address {object}
 *  Ex:
 *  params = {
 *      address: {
 *          street: string,
 *          neighborhood: string,
 *          zip_code: string,
 *          city: string,
 *          state: string
 *          number: string
 *      }
 *  }
 */
routes.post('/user/:user/address/edit/:id', addressService.edit);

/**
 * Remove Address for User
 *  user: User ID
 *  id: address ID
 */
routes.post('/user/:user/address/remove/:id', addressService.remove);


/**
 * Phone routes
 */


/**
 * Create Phone for User
 *  user: User ID
 *  params = phone {object}
 *  Ex:
 *  params = {
 *      phone: {
 *          number: string
 *      }
 *  }
 */
// routes.post('/user/:user/phone/create', phoneService.create);

/**
 * Edit Phone for User
 *  user: User ID
 *  id: phone ID
 *  params = phone {object}
 *  Ex:
 *  params = {
 *      phone: {
 *          number: string
 *      }
 *  }
 */
// routes.post('/user/:user/phone/edit/:id', phoneService.edit);

/**
 * Remove Phone for User
 *  user: User ID
 *  id: phone ID
 */
// routes.post('/user/:user/phone/remove/:id', phoneService.remove);

module.exports = routes;