const { ErrorHandler } = require('../../errors');
const {
    statusCodesEnum: { BAD_REQUEST },
    customCodesEnum: { ENTITY_NOT_VALID_CC }
} = require('../../constants');

module.exports = (validator) => (req, res, next) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { avatar, ...other } = req.body;

        const { error } = validator.validate(other);

        if (error) {
            const [{ message }] = error.details;

            throw new ErrorHandler(
                message,
                BAD_REQUEST,
                ENTITY_NOT_VALID_CC
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
