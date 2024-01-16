'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  PasswordHistory.init(
    {
      userId: DataTypes.INTEGER,
      previousPasswords: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PasswordHistory',
    },
  );
  return PasswordHistory;
};
