// Phone model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    mobile: {
        type: "string",
        minLength: 16
    },
    home: {
        type: "string",
        minLength: 15
    }
};

const schema = {
    type: "object",
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


