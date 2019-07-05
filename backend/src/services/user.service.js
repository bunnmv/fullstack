// User service to match routes and SQL queries.
// REST API
const userController = require('../controllers/user.controller');
const Model = require('../models/user.model');
const UserService = {};

UserService.getAll = async(req, res, next)  => {
    try {
        const list = Object.values(await userController.getAll());
        res.json(list);
    } catch (e) {
        res.sendStatus(400);
    }
};

UserService.get = async(req, res, next)  => {
    try {
        const id = parseInt(req.params.id);
        const user = await userController.get(id);
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

UserService.create = async(req, res, next)  => {
    try {
        // data from request params
        const newUser = req.body.user;

        //Verify CPF server side
        // todo function verifyCPF()
        //Verify if exists another user with same cpf
        let userDB = await userController.getByCPF(newUser.cpf);

        if(userDB){
            res.json({ success: false, errors: 'ALREADY_EXIST'});
        } else {
            if(Model.validate(newUser)) {
                const id = await userController.create(newUser);
                res.json({ success: true , user: id});
            } else {
                res.json({ success: false, errors: Model.errors(Model.validate.errors) });
            }
        }
    } catch (e) {
        res.sendStatus(400);
    }
};


UserService.remove = async(req, res, next)  => {
    try {

        const id = parseInt(req.params.id); // from route params
        const userDB = await userController.get(id);
        if(userDB) {// verify if the user really exists
            await userController.remove(id);
            res.json({ success: true });
        } else {
            res.sendStatus(404); // User not found
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

UserService.edit = async(req, res, next)  => {
    try {
        const userEditions = req.body.user; // from request body
        const id = parseInt(req.params.id); // from route params
        const userDB = await userController.get(id);

        if(userDB) { // verify if the user really exists
            if(Model.validate(userEditions)){
                await userController.edit(id, userEditions);
                res.json({ success: true });
            } else {
                res.json({ success: false, errors: Model.errors(Model.validate.errors) });
            }
        } else {
            res.sendStatus(404); // User not found
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

module.exports = UserService;
