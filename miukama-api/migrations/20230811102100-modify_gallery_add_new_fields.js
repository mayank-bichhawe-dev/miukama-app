'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Galleries',
        'fileSystemId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Galleries',
        'imagePath',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
