const AppConstants = require("../constants/appConstants");
const ErrorConstants = require("../constants/errorCodes");

const isValidDepositAmount = (depositAmount) => {
    if(depositAmount < AppConstants.MIN_DEPOSIT_AMOUNT)
        throw new Error(ErrorConstants.MIN_DEPOSIT_AMT_CHECK_FAILURE);
    else if(depositAmount > AppConstants.MAX_DEPOSIT_AMOUNT)
        throw new Error(ErrorConstants.MAX_DEPOSIT_AMT_CHECK_FAILURE);
    return true;
}

const isValidDepositByAccBalance = (depositAmount, accountBalance) => {
    if(depositAmount + accountBalance >= AppConstants.MAX_ACCOUNT_BALANCE)
        throw new Error(ErrorConstants.MAX_ACCOUNT_BALANCE_REACHED);
    return true;
}

const isValidWithdrawalAmount = (withdrawAmount) => {
    if(withdrawAmount < AppConstants.MIN_WITHDRAW_AMOUNT)
        throw new Error(ErrorConstants.MIN_WITHDRAW_AMT_CHECK_FAILURE);
    else if(withdrawAmount > AppConstants.MAX_WITHDRAW_AMOUNT)
        throw new Error(ErrorConstants.MAX_WITHDRAW_AMT_CHECK_FAILURE);

    return true;
}

const isValidWithdrawalByAccBalance = (withdrawAmount, accountBalance) => {
    if(accountBalance - withdrawAmount < AppConstants.MIN_ACCOUNT_BALANCE)
        throw new Error(ErrorConstants.MIN_ACCOUNT_BALANCE_REACHED);
    return true;
}

module.exports = {
    isValidDepositAmount,
    isValidDepositByAccBalance,
    isValidWithdrawalAmount,
    isValidWithdrawalByAccBalance,
}