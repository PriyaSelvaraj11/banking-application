const executeCommand = require('../controller/index.js');
const  { deleteAccount } = require('../service/delete.js');

const { expect, it } = require('@jest/globals');

it('Withdraw_valid_amount ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [accountId,  3000]);
    expect(deposit).toBe(3000);
    const withdraw = await executeCommand('Withdraw', [accountId,  1000]);
    expect(withdraw).toBe(2000);

    await deleteAccount(accountId);
});

it('Withdraw_lesser_than_min_withdraw_amount ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const withdraw = await executeCommand('Withdraw', [accountId,  100]);
    expect(withdraw).toBe("Error: The minimum withdrawal amount is $1000 per transaction");

    await deleteAccount(accountId);
});

it('Withdraw_greater_than_max_withdraw_amount ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const withdraw = await executeCommand('Withdraw', [accountId,  60000]);
    expect(withdraw).toBe("Error: The maximum withdrawal amount is $25000 per transaction");

    await deleteAccount(accountId);
});

it('Withdraw_count_greater_than_3_per_day ', async () => {
    const accountId = await executeCommand('Create', ["Aura"]);
    expect(accountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [accountId,  10000]);
    expect(deposit).toBe(10000);

    const withdraw1 = await executeCommand('Withdraw', [accountId,  1000]);
    expect(withdraw1).toBe(9000);
    const withdraw2 = await executeCommand('Withdraw', [accountId,  1000]);
    expect(withdraw2).toBe(8000);
    const withdraw3 = await executeCommand('Withdraw', [accountId,  1000]);
    expect(withdraw3).toBe(7000);

    const withdraw4 = await executeCommand('Withdraw', [accountId,  1000]);
    expect(withdraw4).toBe("Error: No more than 3 withdrawals are allowed in a day");

    await deleteAccount(accountId);
});
