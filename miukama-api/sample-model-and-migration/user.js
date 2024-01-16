'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserExample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserExample.belongsTo(models.Company, { foreignKey: 'companyId' });
    }
  }
  UserExample.init(
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      // modelName: 'User',
    },
  );
  return UserExample;
};
