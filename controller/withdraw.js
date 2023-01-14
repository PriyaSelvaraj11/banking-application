const Joi = require('joi');
const { withdrawRequestBuilder } = require('../utils/requestBuilder');
const { WithdrawRequestSchema } = require('../validators/commands');
const { withdrawAmount } = require('../service/account');

const withdrawAccount = async (args) => {
    try {
        const requestPayload = withdrawRequestBuilder(args);
        const validateResponse = await WithdrawRequestSchema.validate(requestPayload);
        if(validateResponse.value) {
            const { accountNumber, amount } = validateResponse.value;
            const withdrawAccountResponse = await withdrawAmount(accountNumber, amount);
            return withdrawAccountResponse;
        } else {
            throw new Error(validateResponse.error);
        }
    } catch(e) {
        console.log(e);
    }
}

module.exports =  withdrawAccount;