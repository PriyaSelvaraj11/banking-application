const Joi = require('joi');
const { depositRequestBuilder } = require('../utils/requestBuilder');
const { DepositRequestSchema } = require('../validators/commands');
const { depositAmount } = require('../service/transaction');

/**
 * Controller to deposit amount by account Id
 * @param {array} args 
 * @returns {number} remaining balance
 */
const depositAccount = async (args) => {
    try {
        const requestPayload = depositRequestBuilder(args);
        const validateResponse = await DepositRequestSchema.validate(requestPayload);
        if (validateResponse.error) throw new Error(validateResponse.error);

        const { accountId, amount } = validateResponse.value;
        const depositAccountResponse = await depositAmount(accountId, amount);
        return depositAccountResponse;

    } catch (exception) {
        return exception.message;
    }
}

module.exports = depositAccount;