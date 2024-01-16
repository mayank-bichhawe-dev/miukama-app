const notificationSchemaBody = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    read: { type: 'boolean' },
    isDelete: { type: 'boolean' },
  },
  required: ['title', 'read', 'isDelete'],
};
const notificationSchemaParams = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
};
module.exports = { notificationSchemaBody, notificationSchemaParams };
