'use strict';
const Accounts = require("./accounts");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Accounts,
        key: 'id'
      }
    },
    transaction_type: {
      type: DataTypes.INTEGER
    },
    payload: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};