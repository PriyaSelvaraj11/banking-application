const { sequelize } = require("../models");

const UserRepo = require("../repository/user");
const AccountsRepo = require("../repository/account");
const AccountCountersRepo = require("../repository/accountCounter");

const ErrorConstants = require("../constants/errorCodes");
const TransactionHelper = require("../utils/transactionHelper");

async function createAccountByUserName(userName) {
    let createdAccount = null;
    const transaction = await sequelize.transaction();
    try {
        const userId = await UserRepo.createUser(userName, transaction);
        if (userId) {
            createdAccount = await AccountsRepo.createAccount(
                { user_id: userId, balance: 0 }, transaction
            );
        }
        await transaction.commit();
        return createdAccount?.id;
    } catch (e) {
        await transaction.rollback();
        throw new Error('Unable to create record');
    }
}

async function getAccountBalance(accountNumber) {
    try {
        const account = await AccountsRepo.getAccountByNumber(accountNumber);
        if (account === null) {
            throw new Error(ErrorConstants.ACCOUNT_NUMBER_INVALID);
        }
        return account.balance;
    } catch (e) {
        throw new Error(e);
    }
}

async function depositAmount(accountNumber, depositAmount) {
    const transaction = await sequelize.transaction();
    try {
        if (TransactionHelper.isValidDepositAmount(depositAmount)) {
            let account = await AccountsRepo.getAccountByNumber(accountNumber);
            if (account === null) {
                throw new Error(ErrorConstants.ACCOUNT_NUMBER_INVALID);
            }
            if (TransactionHelper.isValidDepositByAccBalance(depositAmount, account.balance)) {
                const newBalance = account.balance + depositAmount;
                account = await AccountsRepo.updateAccountBalance({
                    accountNumber,
                    balance: newBalance
                }, transaction);

                counterAudit = await AccountCountersRepo.createRecord({
                    accountNumber
                }, transaction);

                transaction.commit();
            }
            return account.balance;
        }
    } catch (exception) {
        console.log(exception);
        transaction.rollback();
        throw new Error(exception);
    }
}

async function withdrawAmount(accountNumber, withdrawAmount) {
    try {
        if (TransactionHelper.isValidWithdrawalAmount(withdrawAmount)) {
            let account = await AccountsRepo.getAccountByNumber(accountNumber);
            if (account === null) {
                throw new Error(ErrorConstants.ACCOUNT_NUMBER_INVALID);
            }
            if (TransactionHelper.isValidWithdrawalByAccBalance(withdrawAmount, account.balance)) {
                const newBalance = account.balance - withdrawAmount;
                account = await AccountsRepo.updateAccountBalance({
                    accountNumber,
                    balance: newBalance
                });
                console.log(account);
            }
            return account;
        }
    } catch (exception) {
        throw new Error(exception);
    }
}

module.exports = {
    createAccountByUserName,
    getAccountBalance,
    depositAmount,
    withdrawAmount,
}