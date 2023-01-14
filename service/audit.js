const { sequelize } = require("../models");

const TransactionRepo = require("../repository/transaction");

async function addTransactionAudit(command, args) {
    try {
        await TransactionRepo.createTransaction(transactionData);
    } catch (e) {
        throw new Error('Unable to create record');
    }
}

module.exports = addTransactionAudit;