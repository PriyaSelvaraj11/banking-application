const { createRequestBuilder } = require('../utils/request-builder');
const { CreateRequestSchema } = require('../validators/commands');

const { createAccountByUserName } = require('../service/manage-account');

/**
 * Controller to create account by user name
 * @param {array} args 
 * @returns {number} created account Id
 */
const createAccount = async (args) => {
    try {
        const requestPayload = createRequestBuilder(args);
        const validateResponse = await CreateRequestSchema.validate(requestPayload);
        if (validateResponse.error) throw new Error(validateResponse.error);

        const { userName } = validateResponse.value;
        const accountCreation = await createAccountByUserName(userName);
        return accountCreation;
    } catch (exception) {
        return exception.message;
    }
}

module.exports = createAccount;