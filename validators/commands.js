const Joi = require('joi');

const CreateRequestSchema = Joi.object().keys({
    userName: Joi.string().required(),
});

const DepositRequestSchema = Joi.object().keys({
    accountNumber: Joi.number().required(),
    amount: Joi.number().required(),
});

const WithdrawRequestSchema = Joi.object().keys({
    accountNumber: Joi.number().required(),
    amount: Joi.number().required(),
});

const BalanceRequestSchema = Joi.object().keys({
    accountNumber: Joi.number().required(),
});

module.exports = {
    CreateRequestSchema,
    DepositRequestSchema,
    WithdrawRequestSchema,
    BalanceRequestSchema
}


