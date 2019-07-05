const db = require('../controllers/db.controller');

//Phone SQL queries controller
const PhoneController = {};


PhoneController.getAll = async (user) => {
    return await getUsersPhones(user);
};

PhoneController.get = async (id) => {
    return await getPhoneById(id);
};

PhoneController.create = async (user, newPhone) => {
    return await createPhone(user, newPhone);
};

PhoneController.remove = async (id) => {
    return await removePhone(id);
};

PhoneController.edit = async (id, phoneEditions) => {
    return await editPhone(id, phoneEditions);
};

// Query  address from DB respective to the user passed as parameter
const getUsersPhones =  async (id) => {
    const findAllPhones = 'SELECT * FROM phone WHERE user_id = $1 ORDER BY id DESC';
    try {
        const { rows } = await db.query(findAllPhones,[id]);
        return rows;
    } catch(error) {
        throw error;
    }
};

// Query  address from DB respective to the id passed as parameter
const getPhoneById =  async (id) => {
    const findPhone = 'SELECT * FROM phone WHERE id = $1';
    try {
        const { rows } = await db.query(findPhone,[id]);
        return rows[0] ;
    } catch(error) {
        throw error;
    }
};

// Mutate database inserting new address for user
const createPhone = async(user,newPhone) => {
    const newPhoneQuery = 'INSERT INTO phone (user_id,number,type) VALUES ($1,$2, $3) returning id';
    try {
        const { rows } = await db.query(newPhoneQuery,[user,newPhone.number,newPhone.type]);
        return rows[0];
    } catch(error) {
        throw error;
    }
};

// Mutate database deleting address that matches the respective ID
const removePhone = async(id) => {
    const removePhone = 'DELETE FROM phone WHERE id = $1';
    try {
        const { rows } = await db.query(removePhone,[id]);
        return rows ;
    } catch(error) {
        throw error;
    }
};

// Mutate database editing address that matches the respective ID
const editPhone = async(id, phoneEditions) => {
    const editPhoneQuery = 'UPDATE phone SET number = $1, type = $2 WHERE id = $3';
    try {
        const { rows } = await db.query(editPhoneQuery,[phoneEditions.number,phoneEditions.type,id]);
        return rows;
    } catch(error) {
        throw error;
    }
};

module.exports = PhoneController;