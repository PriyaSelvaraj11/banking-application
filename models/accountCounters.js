'use strict';
const Accounts = require("./accounts");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountCounters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccountCounters.init({
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Accounts,
        key: 'id'
      }
    },
    deposits_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    withdrawals_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'AccountCounters',
  });
  return AccountCounters;
};