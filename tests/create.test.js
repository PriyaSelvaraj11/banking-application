const executeCommand = require('../controller/index.js');
const { deleteAccount } = require('../service/delete.js');

const { expect, it } = require('@jest/globals');

it('create account', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));
    await deleteAccount(accountId);
});
