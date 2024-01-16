const categorySchemaBody = {
  type: 'object',
  properties: {
    categoryName: { type: 'string' },
    galleryId: { type: 'integer' },
    visibility: { type: 'boolean' },
    subCategories: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['categoryName', 'galleryId', 'visibility', 'subCategories'],
  //   additionalProperties: false
};
const categorySchemaParams = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
  //   additionalProperties: false
};

const categoryUpdateSchemaBody = {
  ...categorySchemaBody,
  properties: {
    ...categorySchemaBody.properties,
    subCategories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          id: {
            type: 'integer',
          },
        },
      },
    },
  },
};

module.exports = {
  categorySchemaBody,
  categorySchemaParams,
  categoryUpdateSchemaBody,
};
