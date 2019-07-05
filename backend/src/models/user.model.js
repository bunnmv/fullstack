// User model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    name: {
        type: "string",
        minLength: 4
    },
    email: {
        format: "email",
        minLength: 6
    },
    cpf: {
        type: "string",
        minLength: 14
    },
    birth_date: {
        format: "date"
    },

};

const schema = {
    type: "object",
    required: [ "name","email","cpf","birth_date"],
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


