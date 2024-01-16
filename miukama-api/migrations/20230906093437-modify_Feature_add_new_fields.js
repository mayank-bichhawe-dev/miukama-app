'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    return Promise.all([
      queryInterface.addColumn(
        'Features',
        'orderPriority',
        {
          type: Sequelize.INTEGER,
          allowNull:true,
        },
      ),
      ])
    
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
