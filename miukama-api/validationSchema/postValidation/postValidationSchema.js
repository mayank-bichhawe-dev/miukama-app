const postSchemaBody = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    externalLink: { type: 'string' },
  },
  required: ['title', 'description', 'externalLink'],
};
const postSchemaParams = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
};
module.exports = { postSchemaBody, postSchemaParams };
