const executeCommand = require('../controller/index.js');
const { deleteAccount } = require('../service/delete.js');

const { expect, it } = require('@jest/globals');

it('valid_transfer_transaction', async () => {
    const sourceAccountId = await executeCommand('Create', ["Aura"]);
    expect(sourceAccountId).toEqual(expect.any(Number));
    const destinationAccountId = await executeCommand('Create', ["Steve"]);
    expect(destinationAccountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [sourceAccountId,  10000]);
    expect(deposit).toBe(10000);

    const transfer = await executeCommand('Transfer', [sourceAccountId,destinationAccountId,  1000]);
    expect(transfer).toBe("Successful");

    await deleteAccount(sourceAccountId);
    await deleteAccount(destinationAccountId);
});

it('invalid_min_withdrawal_transfer', async () => {
    const sourceAccountId = await executeCommand('Create', ["Aura"]);
    expect(sourceAccountId).toEqual(expect.any(Number));
    const destinationAccountId = await executeCommand('Create', ["Steve"]);
    expect(destinationAccountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [sourceAccountId,  10000]);
    expect(deposit).toBe(10000);

    const transfer = await executeCommand('Transfer', [sourceAccountId,destinationAccountId,  500]);
    expect(transfer).toBe("Error: The minimum withdrawal amount is $1000 per transaction");

    await deleteAccount(sourceAccountId);
    await deleteAccount(destinationAccountId);
});

it('invalid_max_withdrawal_transfer', async () => {
    const sourceAccountId = await executeCommand('Create', ["Aura"]);
    expect(sourceAccountId).toEqual(expect.any(Number));
    const destinationAccountId = await executeCommand('Create', ["Steve"]);
    expect(destinationAccountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [sourceAccountId,  10000]);
    expect(deposit).toBe(10000);

    const transfer = await executeCommand('Transfer', [sourceAccountId,destinationAccountId,  30000]);
    expect(transfer).toBe("Error: The maximum withdrawal amount is $25000 per transaction");

    await deleteAccount(sourceAccountId);
    await deleteAccount(destinationAccountId);
});

it('invalid_source_accountId_transfer', async () => {
    const transfer = await executeCommand('Transfer', [1234, 1, 2000]);
    expect(transfer).toBe("Error: Account number is invalid");
});

it('invalid_destination_accountId_transfer', async () => {
    const sourceAccountId = await executeCommand('Create', ["Steve"]);
    expect(sourceAccountId).toEqual(expect.any(Number));

    const deposit = await executeCommand('Deposit', [sourceAccountId,  10000]);
    expect(deposit).toBe(10000);
    
    const transfer = await executeCommand('Transfer', [sourceAccountId, 12345, 2000]);
    expect(transfer).toBe("Error: Account number is invalid");
});

