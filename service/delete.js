const { sequelize } = require("../models");

const UserRepo = require("../dao/user");
const AccountRepo = require("../dao/account");
const TransactionCounterRepo = require("../dao/transaction-counter");

const ErrorConstants = require("../constants/errorConstants");

/**
 * Service to delete account by account Id
 * @param {number} accountId 
 */
async function deleteAccount(accountId) {
    const transaction = await sequelize.transaction();
    try {
        const account = await AccountRepo.findByAccountId(accountId);
        if (account) {
            await TransactionCounterRepo.deleteByAccountId(accountId, transaction);
            await AccountRepo.deleteAccount(accountId, transaction);
            await UserRepo.deleteUser(
                account.user_id, transaction
            );
        }
        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

module.exports = {
    deleteAccount
}