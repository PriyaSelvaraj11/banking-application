const { User } = require("../models");
const ErrorConstants = require("../constants/error-constants");

async function createUser(userName, transaction) {
    try {
        const user = await User.create(
            { name: userName },
            { transaction });
        return user.dataValues.id;
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

async function deleteUser(userId, transaction) {
    try {
        await User.destroy({
            where: {
                id: userId
            }
        },
            { transaction });
    } catch (exception) {
        throw new Error(ErrorConstants.DB_ERROR);
    }
}

module.exports = {
    createUser,
    deleteUser,
}