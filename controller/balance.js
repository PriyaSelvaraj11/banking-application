const Joi = require('joi');
const { balanceRequestBuilder } = require('../utils/requestBuilder');
const { BalanceRequestSchema } = require('../validators/commands');
const { getAccountBalance } = require('../service/account');

const getAccountBalance = async (args) => {
    try {
        const requestPayload = balanceRequestBuilder(args);
        const validateResponse = await BalanceRequestSchema.validate(requestPayload);
        if(validateResponse.value) {
            const { accountNumber } = validateResponse.value;
            const accountBalanceResponse = await getAccountBalance(accountNumber);
            return accountBalanceResponse;
        } else {
            throw new Error(validateResponse.error);
        }
    } catch(e) {
        console.log(e);
    }
}

module.exports =  getAccountBalance;