const {
    MIN_DEPOSIT_AMOUNT,
    MAX_DEPOSIT_AMOUNT,
    MIN_WITHDRAW_AMOUNT,
    MAX_WITHDRAW_AMOUNT,
    MAX_ACCOUNT_BALANCE,
    MIN_ACCOUNT_BALANCE,
    MAX_DEPOSITS_COUNT_PER_DAY,
    MAX_WITHDRAWALS_COUNT_PER_DAY,
} = require("./app-constants");

const ErrorConstants = {
    INVALID_PARAMATERS: 'Invalid Request Arguments',
    INVALID_COMMAND: 'Invalid Command',
    MAX_ACCOUNT_BALANCE_REACHED: `Account balance cannot exceed $${MIN_ACCOUNT_BALANCE}`,
    MIN_ACCOUNT_BALANCE_REACHED: `Account balance cannot be less than $${MAX_ACCOUNT_BALANCE}`,
    MIN_DEPOSIT_AMT_CHECK_FAILURE: `The minimum deposit amount is $${MIN_DEPOSIT_AMOUNT} per transaction`,
    MAX_DEPOSIT_AMT_CHECK_FAILURE: `The maximum deposit amount is $${MAX_DEPOSIT_AMOUNT} per transaction`,
    MIN_WITHDRAW_AMT_CHECK_FAILURE: `The minimum withdrawal amount is $${MIN_WITHDRAW_AMOUNT} per transaction`,
    MAX_WITHDRAW_AMT_CHECK_FAILURE: `The maximum withdrawal amount is $${MAX_WITHDRAW_AMOUNT} per transaction`,
    MAX_DEPOSITS_COUNT_REACHED: `No more than ${MAX_DEPOSITS_COUNT_PER_DAY} deposits are allowed in a day`,
    MAX_WITHDRAWALS_COUNT_REACHED: `No more than ${MAX_WITHDRAWALS_COUNT_PER_DAY} withdrawals are allowed in a day`,
    ACCOUNT_NUMBER_INVALID: 'Account number is invalid',
    MIN_BALANCE_REACHED_WITHDRAWAL: 'Withdrawal amount is less than account balance',
    DB_ERROR: 'Database error',
    INSUFFICIENT_BALANCE: 'Insufficient balance'
}

module.exports = ErrorConstants;