const { ErrorHandler, customErrors: { ENTITY_ALREADY_EXISTS } } = require('../../errors');
const { usersService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const [foundUser] = await usersService.getUsers({ email });

        if (foundUser) {
            throw new ErrorHandler(
                ENTITY_ALREADY_EXISTS.message,
                ENTITY_ALREADY_EXISTS.code,
                ENTITY_ALREADY_EXISTS.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
