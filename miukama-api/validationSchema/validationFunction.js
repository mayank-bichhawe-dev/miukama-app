const Ajv = require('ajv');
const { sendBadRequest } = require('../utils/customResponse');

function validateBody(schema) {
  const ajv = new Ajv({ allErrors: true });
  ajv.addFormat('email', (data) => {
    // Use a regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(data);
  });

  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const isValid = validate(req.body);

    if (!isValid) {
      return sendBadRequest(res, 'Validation Error!', validate.errors);
    }
    next();
  };
}

function validateParams(schema) {
  const ajv = new Ajv({ allErrors: true, coerceTypes: true });
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const isValid = validate(req.params);
    if (!isValid) {
      return sendBadRequest(res, 'Validation Error!', validate.errors);
    }
    next();
  };
}
module.exports = { validateBody, validateParams };
