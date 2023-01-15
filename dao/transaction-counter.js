const moment = require('moment');
const { TransactionCounter, sequelize } = require("../models");
const ErrorConstants = require("../constants/error-constants");
const DateConstants = require("../constants/date-constants");

async function findByAccountNumber(accountId) {
    try {
        return await TransactionCounter.findOne({
            where:
            {
                account_id: accountId,
                record_date: moment().format(DateConstants.DATE_ONLY_FORMAT),
            }
        });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function createRecord({ accountId }, transaction) {
    try {
        const newTransactionCounter = await TransactionCounter.create(
            {
                account_id: accountId,
                record_date: new Date().setHours(0, 0, 0, 0),
            }, { transaction });
        return newTransactionCounter;
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function incrementDepositCount({ transactionCounterId, accountId }, transaction) {
    try {
        await TransactionCounter.update(
            { deposits_count: sequelize.literal(`deposits_count + 1`) },
            {
                where: {
                    id: transactionCounterId,
                    account_id: accountId,
                }
            }, { transaction });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function incrementWithdrawCount({ transactionCounterId, accountId }, transaction) {
    try {
        await TransactionCounter.update(
            { withdrawals_count: sequelize.literal(`withdrawals_count + 1`) },
            {
                where: {
                    id: transactionCounterId,
                    account_id: accountId,
                }
            }, { transaction });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function deleteByAccountId(accountId, transaction) {
    try {
        await TransactionCounter.destroy({
            where: {
                account_id: accountId
            }
        },
            { transaction });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

module.exports = {
    findByAccountNumber,
    createRecord,
    incrementDepositCount,
    incrementWithdrawCount,
    deleteByAccountId
}