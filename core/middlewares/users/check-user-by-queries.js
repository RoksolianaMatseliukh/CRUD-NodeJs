const {
    responseMessagesEnum: {
        ENTITY_NOT_FOUND
    },
    databaseEnum: {
        EMAIL,
        PASSWORD
    }
} = require('../../constants');
const { userQueryBuilderHelper } = require('../../helpers');
const { usersService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { offset, limit, ...where } = await userQueryBuilderHelper(req.query);

        const foundUsers = await usersService.getUsers(where, offset, limit, EMAIL, PASSWORD);

        if (!foundUsers.length) {
            req.message = ENTITY_NOT_FOUND;
        } else {
            req.users = foundUsers;
        }

        next();
    } catch (e) {
        next(e);
    }
};
