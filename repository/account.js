const { Accounts } = require("../models");
const ErrorConstants = require("../constants/errorCodes");

async function createAccount({ userId, balance }, transaction = null) {
    try {
        const account = {
            user_id: userId, balance
        }
        if (transaction) {
            return await Accounts.create(
                account,
                { transaction }
            );
        }
        return await Accounts.create(account);
    } catch (e) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function getAccountByNumber(accountNumber) {
    try {
        return await Accounts.findByPk(accountNumber);
    } catch (e) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function updateAccountBalance({ accountNumber, balance }) {
    try {
        return await Accounts.update({ balance }, {
            where: {
                id: accountNumber
            }
        });
    } catch (e) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

module.exports = {
    createAccount,
    getAccountByNumber,
    updateAccountBalance,
}