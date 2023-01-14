// const Users = require("../models/users");
const { Users } = require("../models");

async function createUser(userName, transaction) {
    const user = await Users.create(
        { name: userName },
        { transaction });
    return user.id;
}

module.exports = {
    createUser,
}