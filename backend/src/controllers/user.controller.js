const db = require('../controllers/db.controller');

//User SQL queries controller
const UserController = {};

UserController.getAll = async () => {
    return await getUsers();
};

UserController.get = async (id) => {
    return await getUserById(id);
};

UserController.getByCPF = async (id) => {
    return await getUserByCPF(id);
};

UserController.create = async (newUser) => {
    return await createUser(newUser);
};

UserController.remove = async (id) => {
    return await removeUser(id);
};

UserController.edit = async (id, userEditions) => {
    return await editUser(id, userEditions);
};

// Query all users from DB
const getUsers =  async () => { // User list does not require whole data
    const findAllQuery = 'SELECT * FROM "user" ORDER BY "user".date_added DESC;'
    try {
        const { rows } = await db.query(findAllQuery);
        return rows ;
    } catch(error) {
        throw error;
    }
};

// Query  user from DB respective to the id passed as parameter
const getUserById =  async (id) => {
    // const findUser = 'SELECT * FROM "user" WHERE id = $1';
    const findUser = 'select\n' +
        '   json_agg(\n' +
        '           json_build_object(\n' +
        '                   \'user\', u,\n' +
        '                   \'addresses\', addresses,\n' +
        '                   \'phones\', phones\n' +
        '               )\n' +
        '       )"user"\n' +
        'from "user" u\n' +
        'left join (\n' +
        '    select\n' +
        '        a.user_id,\n' +
        '        json_agg(\n' +
        '            json_build_object(\n' +
        '                \'id\', a.id,\n' +
        '                \'street\', a.street,\n' +
        '                \'number\', a.number,\n' +
        '                \'neighborhood\', a.neighborhood,\n' +
        '                \'city\', a.city,\n' +
        '                \'state\', a.state,\n' +
        '                \'zip_code\', a.zip_code\n' +
        '                )\n' +
        '            ) addresses\n' +
        '    from\n' +
        '        address a\n' +
        '    group by user_id\n' +
        ') a on u.id = a.user_id\n' +
        'left join (\n' +
        '    select\n' +
        '        p.user_id,\n' +
        '        json_agg(\n' +
        '            json_build_object(\n' +
        '                \'id\', p.id,\n' +
        '                \'mobile\', p.mobile,\n' +
        '                \'home\',p.home\n' +
        '                )\n' +
        '            ) phones\n' +
        '    from\n' +
        '        phone p\n' +
        '    group by user_id\n' +
        ') p on u.id = p.user_id\n' +
        'WHERE u.id = $1';
    try {
        const { rows } = await db.query(findUser,[id]);
        return rows[0].user[0] ;
    } catch(error) {
        throw error;
    }
};

// Query user from DB respective to the CPF passed as parameter
const getUserByCPF =  async (id) => {
    const findUser = 'SELECT * FROM "user" WHERE cpf = $1';
    try {
        const { rows } = await db.query(findUser,[id]);
        return rows[0] ;
    } catch(error) {
        throw error;
    }
};

// Mutate database inserting new user
const createUser = async(newUser) => {
    const newUserQuery = 'INSERT INTO "user" (name, email, birth_date, cpf) VALUES ($1, $2, $3, $4) returning id';
    try {
        const { rows } = await db.query(newUserQuery,[newUser.name,newUser.email,newUser.birth_date,newUser.cpf]);
        return rows[0] ;
    } catch(error) {
        throw error;
    }
};

// Mutate database deleting user that matches the respective ID
const removeUser = async(id) => {
    const removeUser = 'DELETE FROM "user" WHERE id = $1';
    try {
        const { rows } = await db.query(removeUser,[id]);
        return rows ;
    } catch(error) {
        throw error;
    }
};

// Mutate database updating user that matches the respective ID
const editUser = async(id, userEditions) => {

    const editUserQuery = 'UPDATE "user" SET name = $1, email = $2, birth_date = $3, cpf = $4 WHERE id = $5';
    try {
        const { rows } = await db.query(editUserQuery,[userEditions.name,userEditions.email,userEditions.birth_date,userEditions.cpf, id]);
        return rows ;
    } catch(error) {
        throw error;
    }
};

module.exports = UserController;