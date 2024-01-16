const gallerySchemaBody = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    visibility: { enum: ['true', 'false'] },
  },
  required: ['name', 'visibility'],
};

const gallerySchemaParams = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
};

const galleryVisibilitySchemaParams = {
  type: 'object',
  properties: {
    visibility: {
      enum: ['public', 'private'],
    },
  },
};

module.exports = {
  gallerySchemaBody,
  gallerySchemaParams,
  galleryVisibilitySchemaParams,
};
