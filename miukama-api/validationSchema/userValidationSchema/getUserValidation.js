const userSchemaParams = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
  },
  required: ['userId'],
};

const userSchemaBody = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    address: { type: 'string' },
    contact: { type: 'string' },
  },
  required: ['firstName', 'lastName', 'email', 'address', 'contact'],
};

module.exports = { userSchemaParams, userSchemaBody };
