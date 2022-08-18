'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasOne(models.Item, {foreignKey: 'ItemId'})
      Transaction.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Transaction.init({
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};