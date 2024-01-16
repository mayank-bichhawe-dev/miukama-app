'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SubCategory.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      SubCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      SubCategory.hasMany(models.Product, {
        foreignKey: 'subCategoryId',
      });
    }
  }

  SubCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
    },
  );

  return SubCategory;
};
