'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      itemName: {
        type: Sequelize.STRING,
      },
      itemModel: {
        type: Sequelize.STRING,
      },
      itemProductionNumber: {
        type: Sequelize.STRING,
      },
      itemManufacturer: {
        type: Sequelize.STRING,
      },
      yearOfOrigin: {
        type: Sequelize.DATEONLY,
      },
      color: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
      },
      owner: {
        type: Sequelize.STRING,
      },
      givenBy: {
        type: Sequelize.STRING,
      },
      loanedBy: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      priceOfOrigin: {
        type: Sequelize.FLOAT,
       
      },
      priceOfPurchase: {
        type: Sequelize.FLOAT,
      

      },
      priceOfCurrent: {
        type: Sequelize.FLOAT,
       

      },
      visibility: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
