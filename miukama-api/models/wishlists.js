'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
      Wishlist.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Wishlist.belongsTo(models.SellProduct, {
        foreignKey: 'sellProductId',
      });
    }
  }
  Wishlist.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      sellProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return Wishlist;
};
