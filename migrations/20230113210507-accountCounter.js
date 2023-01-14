'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('AccountCounters', {
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
        type: Sequelize.INTEGER
      },
      withdrawals_count: {
        type: Sequelize.INTEGER
      },
      date: {
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

    await queryInterface.addConstraint("AccountCounters", {
      fields: ["account_id"],
      type: "foreign key",
      name: "counters_fk_1",
      references: {
        table: "Accounts",
        field: "id",
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('AccountCounters');
  }
};
