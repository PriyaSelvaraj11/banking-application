const executeCommand = require('../controller/index.js');
const { expect, it } = require('@jest/globals');

it('create account', async () => {
    const result = await executeCommand('Create', ["Aura"]);
    expect(result).toEqual(expect.any(Number));
});

// it('deposit 500AUD amount in account id 1001', async () => {
//     const result = await executeCommand('Deposit', [1001, 500]);
//     expect(result).toBe('deposit');
// });

// it('withdraw 500AUD amount from account id 1001',async () => {
//     const result = await executeCommand('Withdraw', [1001, 500]);
//     expect(result).toBe('withdraw');
// });