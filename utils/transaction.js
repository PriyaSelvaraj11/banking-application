const AppConstants = require("../constants/app-constants");
const ErrorConstants = require("../constants/error-constants");

/**
 * Validate deposit amount with allowed min and max deposit amount
 * @param {number} depositAmount 
 * @returns {boolean}
 */
const isValidDepositAmount = (depositAmount) => {
    if(depositAmount < AppConstants.MIN_DEPOSIT_AMOUNT)
        throw new Error(ErrorConstants.MIN_DEPOSIT_AMT_CHECK_FAILURE);
    else if(depositAmount > AppConstants.MAX_DEPOSIT_AMOUNT)
        throw new Error(ErrorConstants.MAX_DEPOSIT_AMT_CHECK_FAILURE);
    return true;
}

/**
 * Validate deposit amount with current account balance
 * @param {number} depositAmount 
 * @param {number} accountBalance 
 * @returns {boolean}
 */
const isValidDepositByAccBalance = (depositAmount, accountBalance) => {
    if(depositAmount + accountBalance >= AppConstants.MAX_ACCOUNT_BALANCE)
        throw new Error(ErrorConstants.MAX_ACCOUNT_BALANCE_REACHED);
    return true;
}

/**
 * Validate deposit count with allowed max deposit count
 * @param {object} transactionCounter 
 * @returns {boolean}
 */
const isMaxDepositsReached = (transactionCounter) => {
    if(transactionCounter && transactionCounter.deposits_count >= AppConstants.MAX_DEPOSITS_COUNT_PER_DAY - 1)
        throw new Error(ErrorConstants.MAX_DEPOSITS_COUNT_REACHED);
    return false;
}

/**
 * Validate withdrawal amount with allowed min and max withdrawal amount
 * @param {number} withdrawAmount 
 * @returns {boolean}
 */
const isValidWithdrawalAmount = (withdrawAmount) => {
    if(withdrawAmount < AppConstants.MIN_WITHDRAW_AMOUNT)
        throw new Error(ErrorConstants.MIN_WITHDRAW_AMT_CHECK_FAILURE);
    else if(withdrawAmount > AppConstants.MAX_WITHDRAW_AMOUNT)
        throw new Error(ErrorConstants.MAX_WITHDRAW_AMT_CHECK_FAILURE);

    return true;
}

/**
 * Validate withdrawal amount with current account balance
 * @param {number} withdrawAmount 
 * @param {number} accountBalance 
 * @returns {boolean}
 */
const isValidWithdrawalByAccBalance = (withdrawAmount, accountBalance) => {
    if(accountBalance - withdrawAmount < 0)
        throw new Error(ErrorConstants.INSUFFICIENT_BALANCE);
    if(accountBalance - withdrawAmount < AppConstants.MIN_ACCOUNT_BALANCE)
        throw new Error(ErrorConstants.MIN_ACCOUNT_BALANCE_REACHED);
    return true;
}

/**
 * Validate withdrawal count with allowed max withdrawal count
 * @param {number} transactionCounter 
 * @returns {boolean}
 */
const isMaxWithdrawalsReached = (transactionCounter) => {
    if(transactionCounter.withdrawals_count >= AppConstants.MAX_WITHDRAWALS_COUNT_PER_DAY )
        throw new Error(ErrorConstants.MAX_WITHDRAWALS_COUNT_REACHED);
    return false;
}

module.exports = {
    isValidDepositAmount,
    isValidDepositByAccBalance,
    isValidWithdrawalAmount,
    isValidWithdrawalByAccBalance,
    isMaxDepositsReached,
    isMaxWithdrawalsReached
}