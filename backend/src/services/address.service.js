// Address service to match routes and SQL queries.
// REST API
const addressController = require('../controllers/address.controller');
const userController = require('../controllers/user.controller');
const Model = require('../models/address.model');
const AddressService = {};

AddressService.getAll = async(req, res, next)  => {
    try {
        const user = parseInt(req.params.user);
        const list = Object.values(await addressController.getAll(user));
        res.json(list);
    } catch (e) {
        res.sendStatus(400);
    }
};

AddressService.get = async(req, res, next)  => {
    try {
        const id = parseInt(req.params.id);
        const address = await addressController.get(id);
        if(address) {
            res.json(address);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

AddressService.create = async(req, res, next)  => {
    try {
        // data from request params
        const newAddress = req.body.address;
        const user = req.params.user;

        if(Model.validate(newAddress)) {
            await addressController.create(user,newAddress);
            res.json({ success: true });
        } else {
            res.json({ success: false, errors: Model.errors(Model.validate.errors) });
        }
    } catch (e) {
        res.sendStatus(400);
    }
};


AddressService.remove = async(req, res, next)  => {
    try {

        const id = parseInt(req.params.id); // address id from route params
        const user = parseInt(req.params.user); // user id from route params
        const userDB = await userController.get(user);

        if(userDB) {// verify if the user really exists
            const addressDB = await addressController.get(id);
            if(addressDB){ // verify if the address really exists
                await addressController.remove(id);
                res.json({ success: true });
            } else {
                res.sendStatus(404); // Address not found
            }
        } else {
            res.sendStatus(404); // User not found
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

AddressService.edit = async(req, res, next)  => {
    try {
        const addressEditions = req.body.address; // address object from request body
        const id = parseInt(req.params.id); // address id from route params
        const user = parseInt(req.params.user); // user id from route params
        const userDB = await userController.get(user);
        if(userDB) {// verify if the user really exists
            const addressDB = await addressController.get(id);
            if (addressDB) { // verify if the address really exists
                if (Model.validate(addressEditions)) {
                    await addressController.edit(id, addressEditions);
                    res.json({success: true});
                } else {
                    res.json({success: false, errors: Model.errors(Model.validate.errors)});
                }
            } else {
                res.sendStatus(404); // Address not found
            }
        } else {
            res.sendStatus(404); // User not found
        }
    } catch (e) {
        res.sendStatus(400);
    }
};


module.exports = AddressService;
