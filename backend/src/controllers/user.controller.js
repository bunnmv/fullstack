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
const getUsers =  async () => {
    const findAllQuery = 'SELECT * FROM "user" ORDER BY date_added DESC';
    try {
        const { rows } = await db.query(findAllQuery);
        return rows ;
    } catch(error) {
        throw error;
    }
};

// Query  user from DB respective to the id passed as parameter
const getUserById =  async (id) => {
    const findUser = 'SELECT * FROM "user" WHERE id = $1';
    try {
        const { rows } = await db.query(findUser,[id]);
        return rows[0] ;
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
    const dateNow = new Date();
    const newUserQuery = 'INSERT INTO "user" (name, email, birth_date, cpf, date_added) VALUES ($1, $2, $3, $4, $5) returning id';
    try {
        const { rows } = await db.query(newUserQuery,[newUser.name,newUser.email,newUser.birth_date,newUser.cpf,dateNow]);
        return rows ;
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
        const { rows } = await db.query(editUserQuery,[userEditions.username,userEditions.email,userEditions.birth_date,userEditions.cpf, id]);
        return rows ;
    } catch(error) {
        throw error;
    }
};

module.exports = UserController;