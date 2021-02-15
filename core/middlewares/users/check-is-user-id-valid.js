const { usersValidators: { idValidator } } = require('../../validators');
const { ErrorHandler } = require('../../errors');
const {
    statusCodesEnum: { BAD_REQUEST },
    customCodesEnum: { ID_NOT_VALID_CC }
} = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { userId } = req.params;

        const { error } = idValidator.validate(+userId);

        if (error) {
            const [{ message }] = error.details;

            throw new ErrorHandler(
                message,
                BAD_REQUEST,
                ID_NOT_VALID_CC
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
