const { Sequelize } = require('sequelize');
const executeCommand = require('./controller/index');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/banking') // Example for postgres

async function assertDatabaseConnectionOk() {
	const db = require("./models");
	await db.sequelize.sync();
}

async function init() {
	await assertDatabaseConnectionOk();
	await executeCommand('Deposit', [5, 6000]);
}

init();
