'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Plans',
      [
        {
          planName: 'Hobbiest',
          priceInMonth: 0,
          priceInYear: 0,
          default: true,
          duration: 0,
          highlight: false,
          isHiddenPlan: false,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          planName: 'Collector',
          priceInMonth: 5,
          priceInYear: 0,
          default: false,
          duration: 3,
          highlight: false,
          isHiddenPlan: false,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
        {
          planName: 'admin',
          duration: null,
          default: false,
          priceInMonth: 0,
          priceInYear: 0,
          isHiddenPlan: true,
          highlight: false,
          createdAt: '2023-08-03',
          updatedAt: '2023-08-03',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Plans', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
