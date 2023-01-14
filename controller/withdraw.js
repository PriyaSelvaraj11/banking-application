const Joi = require('joi');
const { withdrawRequestBuilder } = require('../utils/requestBuilder');
const { WithdrawRequestSchema } = require('../validators/commands');
const { withdrawAmount } = require('../service/transaction');

/**
 * Controller to withdraw amount by account Id
 * @param {array} args 
 * @returns {string} remaining account balance
 */
const withdrawAccount = async (args) => {
    try {
        const requestPayload = withdrawRequestBuilder(args);
        const validateResponse = await WithdrawRequestSchema.validate(requestPayload);
        if (validateResponse.error) throw new Error(validateResponse.error);

        const { accountId, amount } = validateResponse.value;
        const withdrawAccountResponse = await withdrawAmount(accountId, amount);
        return withdrawAccountResponse;
    } catch (exception) {
        return exception.message;
    }
}

module.exports = withdrawAccount;