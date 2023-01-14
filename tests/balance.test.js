const executeCommand = require('../controller/index.js');
const  { deleteAccount } = require('../service/delete.js');

const { expect, it } = require('@jest/globals');

it('check_empty_account_balance', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const balance = await executeCommand('Balance', [accountId]);
    expect(balance).toBe(0);

    await deleteAccount(accountId);
});

it('check_account_balance', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    await executeCommand('Deposit', [accountId,  500]);

    const balance = await executeCommand('Balance', [accountId]);
    expect(balance).toBe(500);

    await deleteAccount(accountId);
});

