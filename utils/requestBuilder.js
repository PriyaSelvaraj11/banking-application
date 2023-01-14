const ErrorConstants = require('../constants/errorConstants');

const createRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        userName: args[0]
    }
}

const depositRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        accountId: args[0],
        amount: args[1],
    }
}

const withdrawRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        accountId: args[0],
        amount: args[1],
    }
}

const balanceRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        accountId: args[0],
    }
}

const transferRequestBuilder = (args) => {
    if(!args || !args.length) throw new Error(ErrorConstants.INVALID_PARAMATERS);
    return {
        sourceAccountId: args[0],
        destinationAccountId: args[1],
        amount: args[2],
    }
}

module.exports = {
    createRequestBuilder,
    withdrawRequestBuilder,
    depositRequestBuilder,
    balanceRequestBuilder,
    transferRequestBuilder,
};