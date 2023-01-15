const { sequelize } = require("../models");

const UserRepo = require("../dao/user");
const AccountRepo = require("../dao/account");
const TransactionCounterRepo = require("../dao/transaction-counter");

const ErrorConstants = require("../constants/error-constants");
const TransactionUtils = require("../utils/transaction");

/**
 * Validates deposit amount and persists in DB
 * @param {number} accountId 
 * @param {number} depositAmount 
 * @param transaction
 * @returns {number} updated balance
 */
async function deposit(accountId, depositAmount, transaction) {
    if (TransactionUtils.isValidDepositAmount(depositAmount)) {
        let account = await AccountRepo.findByAccountId(accountId);
        if (account === null) {
            throw new Error(ErrorConstants.ACCOUNT_NUMBER_INVALID);
        }
        let transactionCounter = await TransactionCounterRepo.findByAccountNumber(accountId);
        let transactionCounterId = transactionCounter?.id;

        const isValidDepositByAccBalance = TransactionUtils.isValidDepositByAccBalance(depositAmount, account.balance);
        const isMaxDepositsReached = TransactionUtils.isMaxDepositsReached(transactionCounter?.dataValues);

        if (isValidDepositByAccBalance && !isMaxDepositsReached) {
            const newBalance = account.balance + depositAmount;
            account = await AccountRepo.updateAccountBalance({
                accountId,
                balance: newBalance
            }, transaction);

            if (!transactionCounter) {
                transactionCounter = await TransactionCounterRepo.createRecord({
                    accountId
                }, transaction);
                transactionCounterId = transactionCounter.dataValues.id;
            }

            await TransactionCounterRepo.incrementDepositCount({
                transactionCounterId,
                accountId,
            }, transaction);

            return newBalance;
        }
    }
}

/**
 * Validates withdrawal amount and persists in DB
 * @param {number} accountId 
 * @param {number} withdrawAmount 
 * @param transaction
 * @returns {number} updated balance
 */
async function withdraw(accountId, withdrawalAmount, transaction) {
    if (TransactionUtils.isValidWithdrawalAmount(withdrawalAmount)) {
        let account = await AccountRepo.findByAccountId(accountId);
        if (account === null) {
            throw new Error(ErrorConstants.ACCOUNT_NUMBER_INVALID);
        }
        let transactionCounter = await TransactionCounterRepo.findByAccountNumber(accountId);

        const isValidWithdrawalByAccBalance = TransactionUtils.isValidWithdrawalByAccBalance(withdrawalAmount, account.balance);
        const isMaxWithdrawalsReached = TransactionUtils.isMaxWithdrawalsReached(transactionCounter?.dataValues);

        if (isValidWithdrawalByAccBalance && !isMaxWithdrawalsReached) {
            const newBalance = account.balance - withdrawalAmount;
            account = await AccountRepo.updateAccountBalance({
                accountId,
                balance: newBalance
            }, transaction);

            if (!transactionCounter) {
                transactionCounter = await TransactionCounterRepo.createRecord({
                    accountId
                }, transaction);
            }

            await TransactionCounterRepo.incrementWithdrawCount({
                transactionCounterId: transactionCounter.id || transactionCounter.dataValues.id,
                accountId,
            }, transaction);
            return newBalance;
        }
    }
}

module.exports = {
    deposit,
    withdraw,
}