const faqSchemaBody = {
  type: 'object',
  properties: {
    serialNumber: { type: 'integer' },
    question: { type: 'string' },
    answer: { type: 'string' },
    enable: { type: 'boolean' },
  },
  required: ['serialNumber', 'question', 'answer', 'enable'],
};

const faqSchemaParams = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
};
module.exports = { faqSchemaBody, faqSchemaParams };
