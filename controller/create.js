const Joi = require('joi');
const { createRequestBuilder } = require('../utils/requestBuilder');
const { CreateRequestSchema } = require('../validators/commands');

const { createAccountByUserName } = require('../service/account');
const AuditService = require('../service/audit');

const createAccount = async (args) => {
    try {
        const requestPayload = createRequestBuilder(args);
        const validateResponse = await CreateRequestSchema.validate(requestPayload);
        if(validateResponse.value) {
            const { userName } = validateResponse.value;
            const accountCreation = await createAccountByUserName(userName);
            return accountCreation;
        } else {
            throw new Error(validateResponse.error);
        }
    } catch(e) {
        console.log(e);
    }
}

module.exports =  createAccount;