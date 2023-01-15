const { balanceRequestBuilder } = require('../utils/request-builder');
const { BalanceRequestSchema } = require('../validators/commands');
const { getAccountBalance } = require('../service/manage-account');

/**
 * Controller to retrieve account balance by account Id
 * @param {array} args 
 * @returns account balance
 */
const getBalance = async (args) => {
    try {
        const requestPayload = balanceRequestBuilder(args);
        const validateResponse = await BalanceRequestSchema.validate(requestPayload);
        if (validateResponse.error) throw new Error(validateResponse.error);

        const { accountId } = validateResponse.value;
        const accountBalanceResponse = await getAccountBalance(accountId);
        return accountBalanceResponse;
    } catch (exception) {
        return exception.message;
    }
}

module.exports = getBalance;