const Joi = require('joi');
const { transferRequestBuilder } = require('../utils/requestBuilder');
const { TransferRequestSchema } = require('../validators/commands');
const { transferAmount } = require('../service/transaction');

/**
 * Controller to transfer amount by account Id
 * @param {array} args 
 * @returns {string} Success message
 */
const transfer = async (args) => {
    try {
        const requestPayload = transferRequestBuilder(args);
        const validateResponse = await TransferRequestSchema.validate(requestPayload);
        if (validateResponse.error) throw new Error(validateResponse.error);

        const { sourceAccountId, destinationAccountId, amount } = validateResponse.value;
        const transferAccountResponse = await transferAmount(sourceAccountId, destinationAccountId, amount);
        return transferAccountResponse;
    } catch (exception) {
        return exception.message;
    }
}

module.exports = transfer;