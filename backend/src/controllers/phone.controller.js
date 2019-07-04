const db = require('../controllers/db.controller');

//Phone SQL queries controller
const PhoneController = {};


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

// Query  address from DB respective to the id passed as parameter
const getPhoneById =  async (id) => {
    const findAddress = 'SELECT * FROM phone WHERE id = $1';
    try {
        const { rows } = await db.query(findAddress,[id]);
        return rows[0] ;
    } catch(error) {
        throw error;
    }
};

// Mutate database inserting new address for user
const createPhone = async(user,newPhone) => {
    const newPhoneQuery = 'INSERT INTO phone (user_id,number) VALUES ($1, $2) returning id';
    try {
        const { rows } = await db.query(newPhoneQuery,[user,newPhone.number]);
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
    const editPhoneQuery = 'UPDATE phone SET number = $1 WHERE id = $2';
    try {
        const { rows } = await db.query(editPhoneQuery,[phoneEditions.number,id]);
        return rows;
    } catch(error) {
        throw error;
    }
};

module.exports = PhoneController;