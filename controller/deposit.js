const Joi = require('joi');
const { depositRequestBuilder } = require('../utils/requestBuilder');
const { DepositRequestSchema } = require('../validators/commands');
const { depositAmount } = require('../service/account');

const depositAccount = async (args) => {
    try {
        const requestPayload = depositRequestBuilder(args);
        const validateResponse = await DepositRequestSchema.validate(requestPayload);
        if(validateResponse.value) {
            const { accountNumber, amount } = validateResponse.value;
            const depositAccountResponse = await depositAmount(accountNumber, amount);
            return depositAccountResponse;
        } else {
            throw new Error(validateResponse.error);
        }
    } catch(e) {
        console.log(e);
    }
}

module.exports =  depositAccount;