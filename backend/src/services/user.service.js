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
        let cpf = newUser.cpf.replace(/[^\d]/g, "");
        let sum;
        let remainder;
        sum = 0;
        if (cpf === '00000000000') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '11111111111') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '22222222222') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '33333333333') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '44444444444') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '55555555555') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '66666666666') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '77777777777') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '88888888888') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '99999999999') res.json({ success: false, errors: 'INVALID_CPF'});

        for (let i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10)) ) res.json({ success: false, errors: 'INVALID_CPF'});;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11) ) ) res.json({ success: false, errors: 'INVALID_CPF'});

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

        //Verify CPF server side
        let cpf = userEditions.cpf.replace(/[^\d]/g, "");
        let sum;
        let remainder;
        sum = 0;
        if (cpf === '00000000000') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '11111111111') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '22222222222') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '33333333333') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '44444444444') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '55555555555') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '66666666666') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '77777777777') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '88888888888') res.json({ success: false, errors: 'INVALID_CPF'});
        if (cpf === '99999999999') res.json({ success: false, errors: 'INVALID_CPF'});

        for (let i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10)) ) res.json({ success: false, errors: 'INVALID_CPF'});;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11) ) ) res.json({ success: false, errors: 'INVALID_CPF'});


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
