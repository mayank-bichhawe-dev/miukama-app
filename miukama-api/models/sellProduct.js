'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SellProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SellProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
      });

      SellProduct.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      SellProduct.hasMany(models.Wishlist, {
        foreignKey: 'sellProductId',
      });
    }
  }
  SellProduct.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return SellProduct;
};
