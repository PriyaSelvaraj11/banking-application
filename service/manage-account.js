const { sequelize } = require("../models");

const UserRepo = require("../dao/user");
const AccountRepo = require("../dao/account");

const ErrorConstants = require("../constants/error-constants");

/**
 * Account creation by user name
 * @param {string} userName 
 * @returns {number} created account id
 */
async function createAccountByUserName(userName) {
    let createdAccount = null;
    const transaction = await sequelize.transaction();
    try {
        const userId = await UserRepo.createUser(userName, transaction);
        if (userId) {
            createdAccount = await AccountRepo.createAccount(userId , transaction);
        }
        await transaction.commit();
        return createdAccount?.id;
    } catch (exception) {
        await transaction.rollback();
        throw new Error(exception);
    }
}

/**
 * Retrieve account balance by account id
 * @param {number} accountId 
 * @returns {number} account balance
 */
async function getAccountBalance(accountId) {
    try {
        const account = await AccountRepo.findByAccountId(accountId);
        if (account === null) {
            throw new Error(ErrorConstants.ACCOUNT_NUMBER_INVALID);
        }
        return account.balance;
    } catch (exception) {
        throw new Error(exception);
    }
}


module.exports = {
    createAccountByUserName,
    getAccountBalance,
}