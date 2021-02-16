const { usersService } = require('../../services');
const { usersValidators: { emailValidator } } = require('../../validators');
const { customErrors: { EMAIL_NOT_VALID }, ErrorHandler } = require('../../errors');
const {
    statusCodesEnum: { BAD_REQUEST },
    customCodesEnum: { EMAIL_NOT_VALID_CC }
} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const { error } = emailValidator.validate(req.body);

        if (error) {
            const [{ message }] = error.details;

            throw new ErrorHandler(
                message,
                BAD_REQUEST,
                EMAIL_NOT_VALID_CC
            );
        }

        const [foundUser] = await usersService.getUsers({ email });

        if (!foundUser) {
            throw new ErrorHandler(
                EMAIL_NOT_VALID.message,
                EMAIL_NOT_VALID.code,
                EMAIL_NOT_VALID.customCode
            );
        }

        const { id, name } = foundUser.dataValues;

        req.user = { email, id, name };

        next();
    } catch (e) {
        next(e);
    }
};
