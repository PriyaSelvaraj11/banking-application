const Joi = require('joi');
const createAccount = require('./create');
const deposit = require('./deposit');
const withdraw = require('./withdraw');
const balance = require('./withdraw');

const COMMANDS = require('../constants/commands');

const executeCommand = async (command, args) => {
    try {
        console.log(COMMANDS.CREATE);
        let commandResponse = null;
        if (command === COMMANDS.CREATE)
            commandResponse = createAccount(args);
        else if (command === 'Deposit')
            commandResponse = deposit(args);
        else if (command === COMMANDS.WITHDRAW)
            commandResponse = withdraw(args);
        else if (command === COMMANDS.BALANCE)
            commandResponse = balance(args);
        else
            throw new Error(ErrorConstants.INVALID_COMMAND);
        return commandResponse;
    } catch (e) {
        console.log(e);
    }
}

module.exports = executeCommand;