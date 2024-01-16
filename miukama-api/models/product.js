'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      Product.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId',
      });
      Product.hasMany(models.Wishlist, {
        foreignKey: 'productId',
      });

      Product.hasMany(models.SellProduct, {
        foreignKey: 'productId',
      });

      Product.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      itemName: DataTypes.STRING,
      itemModel: DataTypes.STRING,
      itemProductionNumber: DataTypes.STRING,
      itemManufacturer: DataTypes.STRING,
      yearOfOrigin: DataTypes.DATEONLY,
      color: DataTypes.STRING,
      condition: DataTypes.STRING,
      owner: DataTypes.STRING,
      givenBy: DataTypes.STRING,
      loanedBy: DataTypes.STRING,
      description: DataTypes.TEXT,
      priceOfOrigin: { type: DataTypes.DOUBLE, defaultValue: 0 },
      priceOfPurchase: { type: DataTypes.DOUBLE, defaultValue: 0 },
      priceOfCurrent: { type: DataTypes.DOUBLE, defaultValue: 0 },
      visibility: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      fileSystemId: DataTypes.INTEGER,
      imagePath: DataTypes.STRING,
      subCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return Product;
};
