'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
    queryInterface.addColumn(
      'Products',
      'fileSystemId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Products',
      'imagePath',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Products',
      'subCategoryId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    )
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
