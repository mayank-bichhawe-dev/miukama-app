'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'authProvider', // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'local'
        },
      ),
      queryInterface.addColumn(
        'Users',
        'authToken',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'fileSystemId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'imagePath',
        {
          type: Sequelize.STRING,
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
