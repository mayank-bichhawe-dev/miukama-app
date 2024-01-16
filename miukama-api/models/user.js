'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associations(models) {
      User.hasMany(models.Gallery, {
        foreignKey: 'userId',
      });

      User.hasMany(models.Category, {
        foreignKey: 'userId',
      });

      User.hasMany(models.Product, {
        foreignKey: 'userId',
      });

      User.hasMany(models.Wishlist, {
        foreignKey: 'userId',
      });

      User.hasMany(models.Faq, {
        foreignKey: 'userId',
      });

      User.hasMany(models.SellProduct, {
        foreignKey: 'userId',
      });

      User.hasMany(models.SubCategory, {
        foreignKey: 'userId',
      });
      User.hasMany(models.UserPlan, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      contact: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      authProvider: DataTypes.STRING,
      authToken: DataTypes.STRING,
      fileSystemId: DataTypes.INTEGER,
      imagePath: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordTokenExpire: DataTypes.DATE,
      userType: {
        type: DataTypes.ENUM(['user', 'admin']),
        defaultValue: 'user',
      },
    },

    {
      sequelize,
      paranoid: true,
    },
  );

  User.prototype.getResetPasswordToken = function () {
    // Genrating Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and adding ResetPassWordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // set resetPaaswordExpire time
    this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
  };
  return User;
};
