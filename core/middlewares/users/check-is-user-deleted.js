const { usersService } = require('../../services');
const { ErrorHandler, customErrors: { USER_NOT_DELETED } } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const foundUser = await usersService.getUserById(+userId);

        if (foundUser) {
            throw new ErrorHandler(
                USER_NOT_DELETED.message,
                USER_NOT_DELETED.statusCode,
                USER_NOT_DELETED.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
