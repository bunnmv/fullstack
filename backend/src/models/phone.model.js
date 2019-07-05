// Phone model to validate web client input
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const properties = {
    number: {
        type: "string",
        minLength: 14
    },
    type: {
        type: "string",
        enum: [ "MOBILE", "HOME"]
    }
};

const schema = {
    type: "object",
    required: ["number","type"],
    properties: properties
};

module.exports.validate = ajv.compile(schema);
module.exports.errors = ajv.errorsText;


