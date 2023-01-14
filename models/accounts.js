'use strict';
const Users = require("./users");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accounts.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
      }
    },
    balance: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Accounts;
};