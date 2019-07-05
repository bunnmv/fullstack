// Address model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    street: {
        type: "string",
        minLength: 4
    },
    number: {
        type: "string"
    },
    state: {
        type: "string"
    },
    city: {
        type: "string"
    },
    neighborhood: {
        type: "string"
    },
    zip_code: {
        type: "string",
        minLength: 9
    },

};

const schema = {
    type: "object",
    required: [ "zip_code","city","state","street","neighborhood","number"],
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


