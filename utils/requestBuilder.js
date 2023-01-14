const ErrorConstants = require('../constants/errorCodes');

const createRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        userName: args[0]
    }
}

const depositRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        accountNumber: args[0],
        amount: args[1],
    }
}

const withdrawRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        accountNumber: args[0],
        amount: args[1],
    }
}

const balanceRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        accountNumber: args[0],
    }
}

module.exports = {
    createRequestBuilder,
    withdrawRequestBuilder,
    depositRequestBuilder,
    balanceRequestBuilder,
};