const ErrorConstants = {
    INVALID_PARAMATERS: 'Invalid Request Arguments',
    INVALID_COMMAND: 'Invalid Command',
    MAX_ACCOUNT_BALANCE_REACHED: 'Account balance cannot exceed $100,000',
    MIN_ACCOUNT_BALANCE_REACHED: 'Account balance cannot be less than $0',
    MIN_DEPOSIT_AMT_CHECK_FAILURE: 'The minimum deposit amount is $500 per transaction',
    MAX_DEPOSIT_AMT_CHECK_FAILURE: ' The maximum deposit amount is $50,000 per transaction',
    MIN_WITHDRAW_AMT_CHECK_FAILURE: 'The minimum withdrawal amount is $1,000 per transaction',
    MAX_WITHDRAW_AMT_CHECK_FAILURE: 'The maximum withdrawal amount is $25,000 per transaction',
    MAX_DEPOSITS_COUNT_REACHED: 'No more than 3 deposits are allowed in a day',
    MAX_WITHDRAWAL_COUNT_REACHED: 'No more than 3 withdrawals are allowed in a day',
    ACCOUNT_NUMBER_INVALID: 'Account number is invalid',
    MIN_BALANCE_REACHED_WITHDRAWAL: 'Withdrawal amount is less than account balance',
    DB_ERROR: 'Database error',
}

module.exports = ErrorConstants;