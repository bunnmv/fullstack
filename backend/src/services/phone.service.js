// Phone service to match routes and SQL queries.
// REST API
const phoneController = require('../controllers/phone.controller');
const userController = require('../controllers/user.controller');
const Model = require('../models/phone.model');
const PhoneService = {};


PhoneService.getAll = async(req, res, next)  => {
    try {
        const user = parseInt(req.params.user);
        const list = Object.values(await phoneController.getAll(user));
        res.json(list);
    } catch (e) {
        res.sendStatus(400);
    }
};

PhoneService.get = async(req, res, next)  => {
    try {
        const id = parseInt(req.params.id);
        const phone = await phoneController.get(id);
        if(phone) {
            res.json(phone);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

PhoneService.create = async(req, res, next)  => {
    try {
        // data from request params
        const newPhone = req.body.phone;
        const user = req.params.user;
        if(Model.validate(newPhone)) {
            await phoneController.create(user,newPhone);
            res.json({ success: true });
        } else {
            res.json({ success: false, errors: Model.errors(Model.validate.errors) });
        }
    } catch (e) {
        res.sendStatus(400);
    }
};


PhoneService.remove = async(req, res, next)  => {
    try {
        const id = parseInt(req.params.id); // phone id from route params
        const user = parseInt(req.params.user); // user id from route params
        const userDB = await userController.get(user);
        if(userDB) {// verify if the user really exists
            const phoneDB = await phoneController.get(id);
            if(phoneDB){ // verify if the phone really exists
                await phoneController.remove(id);
                res.json({ success: true });
            } else {
                res.sendStatus(404); // Phone not found
            }
        } else {
            res.sendStatus(404); // User not found
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

PhoneService.edit = async(req, res, next)  => {
    try {
        const phoneEditions = req.body.phone; // phone object from request body
        const id = parseInt(req.params.id); // phone id from route params
        const user = parseInt(req.params.user); // user id from route params
        const userDB = await userController.get(user);

        if(userDB) { // verify if the user really exists
            const phoneDB = await phoneController.get(id);
            if (phoneDB) { // verify if the address really exists
                if (Model.validate(phoneEditions)) {
                    await phoneController.edit(id, phoneEditions);
                    res.json({success: true});
                } else {
                    res.json({success: false, errors: Model.errors(Model.validate.errors)});
                }
            } else {
                res.sendStatus(404); // Phone not found
            }
        }  else {
            res.sendStatus(404); // User not found
        }
    } catch (e) {
        res.sendStatus(400);
    }
};


module.exports = PhoneService;
