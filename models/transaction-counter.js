'use strict';
const moment = require('moment');
const DateConstants = require("../constants/date-constants");
const Account = require("./account");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionCounter extends Model {
    static associate(models) {
      // define association here
    }
  }
  TransactionCounter.init({
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Account,
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
    record_date: {
      type: DataTypes.DATEONLY,
      get: function () {
        return moment(this.getDataValue('date')).format(DateConstants.DATE_ONLY_FORMAT);
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionCounter',
    freezeTableName: true,
  });
  return TransactionCounter;
};