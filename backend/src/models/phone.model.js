// Phone model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    number: {
        type: "string",
        minLength: 8
    }
};

const schema = {
    type: "object",
    required: [ "number"],
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


