const db = require('../controllers/db.controller');

//Address SQL queries controller
const AddressController = {};

AddressController.getAll = async (user) => {
    return await getUserAddresses(user);
};

AddressController.get = async (id) => {
    return await getAddressById(id);
};

AddressController.create = async (user, newAddress) => {
    return await createAddress(user, newAddress);
};

AddressController.remove = async (id) => {
    return await removeAddress(id);
};

AddressController.edit = async (id, addressEditions) => {
    return await editAddress(id, addressEditions);
};

// Query  address from DB respective to the user passed as parameter
const getUserAddresses =  async (user) => {
    const findAddress = 'SELECT * FROM address WHERE user_id = $1';
    try {
        const { rows } = await db.query(findAddress,[user]);
        return rows ;
    } catch(error) {
        throw error;
    }
};

// Query  address from DB respective to the id passed as parameter
const getAddressById =  async (id) => {
    const findAddress = 'SELECT * FROM address WHERE id = $1';
    try {
        const { rows } = await db.query(findAddress,[id]);
        return rows[0] ;
    } catch(error) {
        throw error;
    }
};

// Mutate database inserting new address for user
const createAddress = async(user,newAddress) => {
    const newAddressQuery = 'INSERT INTO address (user_id,zip_code, city, state, street,number, neighborhood) VALUES ($1, $2, $3, $4,$5,$6,$7) returning id';
    try {
        const { rows } = await db.query(newAddressQuery,[user,newAddress.zip_code,newAddress.city,newAddress.state,newAddress.street,newAddress.number,newAddress.neighborhood]);
        return rows[0];
    } catch(error) {
        throw error;
    }
};

// Mutate database deleting address that matches the respective ID
const removeAddress = async(id) => {
    const removeAddress = 'DELETE FROM address WHERE id = $1';
    try {
        const { rows } = await db.query(removeAddress,[id]);
        return rows ;
    } catch(error) {
        throw error;
    }
};

// Mutate database editing address that matches the respective ID
const editAddress = async(id, addressEditions) => {
    const editAddressQuery = 'UPDATE address SET zip_code = $1, city = $2, state = $3, street = $4, number = $5, neighborhood = $6 WHERE id = $7';
    try {
        const { rows } = await db.query(editAddressQuery,[addressEditions.zip_code,addressEditions.city,addressEditions.state,addressEditions.street,addressEditions.number,addressEditions.neighborhood,id]);
        return rows;
    } catch(error) {
        throw error;
    }
};


module.exports = AddressController;