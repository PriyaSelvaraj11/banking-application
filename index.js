const { Sequelize } = require('sequelize');
const executeCommand = require('./controller/index');

const InputCommands = [
	"Create Aura",
	"Create Aura",
	"Deposit 233 500"
]
async function assertDatabaseConnectionOk() {
	const db = require("./models");
	await db.sequelize.sync();
}

async function init() {
	await assertDatabaseConnectionOk();

	for (let i = 0; i < InputCommands.length; i++) {
		const arr = InputCommands[i].split(" ");
		const command = arr.shift();
		const response = await executeCommand(command, arr);
		console.log("request: " + InputCommands[i]);
		console.log("response: " + response);
		console.log("-----");
	}
}

init();
