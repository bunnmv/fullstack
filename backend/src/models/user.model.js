// User model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    name: {
        type: "string",
        minLength: 3
    },
    phone_number: {
        type: "string",
        minLength: 8
    },
    email: {
        format: "email",
        minLength: 4
    },
    cpf: {
        type: "string",
        minLength: 11
    },
    birth_date: {
        format: "date"
    },

};

const schema = {
    type: "object",
    required: [ "username", "phone_number","email"],
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


