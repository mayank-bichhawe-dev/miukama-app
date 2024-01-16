'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'ContactUs',
      [
        {
          name: 'Admin',
          description: 'Please feel free to contact to Admin for product',
          contact: '+4342098765',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'customer Support',
          description:
            'Sometime you need to little help from our support. So we are here for you.',
          contact: 'customerSupport@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};
