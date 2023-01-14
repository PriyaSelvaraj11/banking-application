// const Users = require("../models/users");
const { Transactions } = require("../models");

async function createTransaction(transactionData) {
    const transaction = await Transactions.create(
        { 
            account_id: transactionData.accountNumber,
            transaction_type: transactionData.type,
            payload: transactionData.data
        });
    return transaction;
}

module.exports = {
    createTransaction,
}