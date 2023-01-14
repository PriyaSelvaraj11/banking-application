const Joi = require('joi');

const CreateRequestSchema = Joi.object().keys({
    userName: Joi.string().required(),
});

const DepositRequestSchema = Joi.object().keys({
    accountId: Joi.number().required(),
    amount: Joi.number().required(),
});

const WithdrawRequestSchema = Joi.object().keys({
    accountId: Joi.number().required(),
    amount: Joi.number().required(),
});

const TransferRequestSchema = Joi.object().keys({
    sourceAccountId: Joi.number().required(),
    destinationAccountId: Joi.number().required(),
    amount: Joi.number().required(),
});

const BalanceRequestSchema = Joi.object().keys({
    accountId: Joi.number().required(),
});

module.exports = {
    CreateRequestSchema,
    DepositRequestSchema,
    WithdrawRequestSchema,
    TransferRequestSchema,
    BalanceRequestSchema
}


