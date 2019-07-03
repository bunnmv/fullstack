// Phone model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    mobile: {
        type: "string",
        minLength: 9
    },
    home: {
        type: "string",
        minLength: 9
    }
};

const schema = {
    type: "object",
    required: [ "mobile","home"],
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


