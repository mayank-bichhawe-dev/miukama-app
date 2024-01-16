const wishlistSchemaBody = {
  type: 'object',
  properties: {
    productId: { type: 'integer' },
  },
  required: ['productId'],
};

const wishlistSchemaParams = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
};
module.exports = { wishlistSchemaBody, wishlistSchemaParams };
