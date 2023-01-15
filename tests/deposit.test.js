const executeCommand = require('../controller/index.js');
const { deleteAccount } = require('../service/delete.js');

const { expect, it } = require('@jest/globals');

it('Deposit_valid_amount ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const deposit1 = await executeCommand('Deposit', [accountId,  500]);
    expect(deposit1).toBe(500);
    const deposit2 = await executeCommand('Deposit', [accountId,  1000]);
    expect(deposit2).toBe(1500);

    await deleteAccount(accountId);
});

it('Deposit_lesser_than_min_deposit_amount ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [accountId,  100]);
    expect(deposit).toBe("Error: The minimum deposit amount is $500 per transaction");

    await deleteAccount(accountId);
});

it('Deposit_greater_than_max_deposit_amount ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [accountId,  60000]);
    expect(deposit).toBe("Error: The maximum deposit amount is $50000 per transaction");

    await deleteAccount(accountId);
});

it('Deposit_count_greater_than_3_per_day ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const deposit1 = await executeCommand('Deposit', [accountId,  500]);
    expect(deposit1).toBe(500);
    const deposit2 = await executeCommand('Deposit', [accountId,  1000]);
    expect(deposit2).toBe(1500);
    const deposit3 = await executeCommand('Deposit', [accountId,  1000]);
    expect(deposit3).toBe(2500);

    const deposit4 = await executeCommand('Deposit', [accountId,  1000]);
    expect(deposit4).toBe("Error: No more than 3 deposits are allowed in a day");

    await deleteAccount(accountId);
});
