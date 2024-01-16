const userSchemaBody = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    contact: { type: 'string' },
    address: { type: 'string' },
    password: { type: 'string' },
  },
  required: [
    'firstName',
    'lastName',
    'email',
    'contact',
    'address',
    'password',
  ],
};

module.exports = userSchemaBody;
