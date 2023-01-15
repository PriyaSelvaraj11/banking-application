const createAccount = require('./create');
const deposit = require('./deposit');
const withdraw = require('./withdraw');
const balance = require('./balance');
const transfer = require('./transfer');

const COMMANDS = require('../constants/commands');

/**
 * Execute command based on the given args input
 * @param {string} command 
 * @param {array} args 
 * @returns {string}
 */
const executeCommand = async (command, args) => {
    try {
        if (command === COMMANDS.CREATE)
            commandResponse = createAccount(args);
        else if (command === COMMANDS.DEPOSIT)
            commandResponse = deposit(args);
        else if (command === COMMANDS.WITHDRAW)
            commandResponse = withdraw(args);
        else if (command === COMMANDS.BALANCE)
            commandResponse = balance(args);
        else if (command === COMMANDS.TRANSFER)
            commandResponse = transfer(args);
        else
            throw new Error(ErrorConstants.INVALID_COMMAND);
        return commandResponse;
    } catch (exception) {
        return exception.message;
    }
}

module.exports = executeCommand;