'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Features',
      [
        {
          name: 'Categories',
          isHiddenFeature: false,
          orderPriority: 2,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'Products',
          isHiddenFeature: false,
          orderPriority: 3,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'Galleries',
          isHiddenFeature: false,
          orderPriority: 5,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'Wishlists',
          isHiddenFeature: false,
          orderPriority: 6,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'Users',
          isHiddenFeature: false,
          orderPriority: 4,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'Description',
          isHiddenFeature: false,
          orderPriority: 1,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'Notifications',
          isHiddenFeature: false,
          orderPriority: 7,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          name: 'AdminUser',
          isHiddenFeature: true,
          orderPriority: 8,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
      ],
      {},
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Features', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
