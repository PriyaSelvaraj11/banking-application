'use strict';
const User = require("./user");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    balance: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Account',
    initialAutoIncrement: 1000,
    freezeTableName: true,
  });
  return Account;
};