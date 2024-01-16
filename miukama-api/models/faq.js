'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Faq.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Faq.init(
    {
      serialNumber: DataTypes.INTEGER,
      question: DataTypes.TEXT,
      answer: DataTypes.TEXT,
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return Faq;
};
