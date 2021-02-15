const { usersValidators: { passwordsValidator } } = require('../../validators');
const { customErrors: { PASSWORDS_NOT_EQUAL }, ErrorHandler } = require('../../errors');
const {
    statusCodesEnum: { BAD_REQUEST },
    customCodesEnum: { PASSWORDS_NOT_VALID_CC }
} = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { password, confirm_password } = req.body;

        const { error } = passwordsValidator.validate(req.body);

        if (error) {
            const [{ message }] = error.details;

            throw new ErrorHandler(
                message,
                BAD_REQUEST,
                PASSWORDS_NOT_VALID_CC
            );
        }

        if (password !== confirm_password) {
            throw new ErrorHandler(
                PASSWORDS_NOT_EQUAL.message,
                PASSWORDS_NOT_EQUAL.statusCode,
                PASSWORDS_NOT_EQUAL.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
