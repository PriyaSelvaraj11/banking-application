const { sequelize } = require("../models");

const TransactionFacade = require("./transaction-facade");
const AppConstants = require("../constants/app-constants");

/**
 * Deposit amount by accountId
 * @param {number} accountId 
 * @param {number} amount 
 * @returns {number}
 */
async function depositAmount(accountId, amount) {
    const transaction = await sequelize.transaction();
    try {
        const newBalance = await TransactionFacade.deposit(accountId, amount, transaction);
        await transaction.commit();
        return newBalance;
    } catch (exception) {
        transaction.rollback();
        throw new Error(exception);
    }
}

/**
 * Withdraw amount by accountId
 * @param {number} accountId 
 * @param {number} withdrawalAmount 
 * @returns {number}
 */
async function withdrawAmount(accountId, withdrawalAmount) {
    const transaction = await sequelize.transaction();
    try {
        const newBalance = await TransactionFacade.withdraw(accountId, withdrawalAmount, transaction);
        await transaction.commit();
        return newBalance;
    } catch (exception) {
        transaction.rollback();
        throw new Error(exception);
    }
}

/**
 * Transfer amount by accountId
 * @param {number} sourceAccountId 
 * @param {number} destinationAccountId 
 * @param {number} amount 
 * @returns {string}
 */
async function transferAmount(sourceAccountId, destinationAccountId, amount) {
    const transaction = await sequelize.transaction();
    try {
        await TransactionFacade.withdraw(sourceAccountId, amount, transaction);
        await TransactionFacade.deposit(destinationAccountId, amount, transaction);
        await transaction.commit();
        return AppConstants.SUCCESSFUL;
    } catch (exception) {
        transaction.rollback();
        throw new Error(exception);
    }
}

module.exports = {
    depositAmount,
    withdrawAmount,
    transferAmount,
}