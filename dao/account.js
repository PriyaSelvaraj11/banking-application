const { Account } = require("../models");
const ErrorConstants = require("../constants/error-constants");

async function createAccount(userId , transaction = null) {
    try {
        const account = {
            user_id: userId,
            balance: 0
        }
        if (transaction) {
            return await Account.create(
                account,
                { transaction }
            );
        }
        return await Account.create(account);
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function findByAccountId(accountId) {
    try {
        return await Account.findByPk(accountId);
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function updateAccountBalance({ accountId, balance }) {
    try {
        return await Account.update({ balance }, {
            where: {
                id: accountId
            }
        });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function deleteAccount(accountId, transaction) {
    try {
        await Account.destroy({
            where: {
                id: accountId
            }
        },
            { transaction });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

module.exports = {
    createAccount,
    findByAccountId,
    updateAccountBalance,
    deleteAccount,
}