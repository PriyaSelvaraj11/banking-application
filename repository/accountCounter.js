// const Users = require("../models/users");
const { AccountCounters } = require("../models");

async function incrementDepositCount(accountNumber , date) {

}

async function createRecord({ accountNumber }, transaction) {
    const payload = { 
        account_id: accountNumber,
        date: Date.now(),
    };
    console.log(payload);
    return await AccountCounters.upsert(
        { 
            account_id: accountNumber,
            date: Date.now(),
        });
}

module.exports = {
    createRecord
}