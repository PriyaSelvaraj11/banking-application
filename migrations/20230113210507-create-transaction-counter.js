'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionCounter', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: {
        type: Sequelize.INTEGER
      },
      deposits_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      withdrawals_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      record_date: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint("TransactionCounter", {
      fields: ["account_id"],
      type: "foreign key",
      name: "counters_fk_1",
      references: {
        table: "Account",
        field: "id",
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionCounter');
  }
};
