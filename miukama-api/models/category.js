'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Gallery, {
        foreignKey: 'galleryId',
      });

      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
      });

      Category.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Category.hasMany(models.SubCategory, {
        foreignKey: 'categoryId',
      });
    }
  }
  Category.init(
    {
      categoryName: DataTypes.STRING,
      galleryId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      visibility: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return Category;
};
