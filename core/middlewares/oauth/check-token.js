const { oauthService } = require('../../services');
const {
    ErrorHandler,
    customErrors: {
        ENTITY_NOT_FOUND, NO_TOKEN, PERMISSION_DENIED
    }
} = require('../../errors');
const { appEnum: { ACCESS_TOKEN, AUTHORIZATION } } = require('../../constants');
const { jwtVerifyHelper } = require('../../helpers');

module.exports = (token_name, token_secret) => async (req, res, next) => {
    try {
        const { userId } = req.params;

        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(
                NO_TOKEN.message,
                NO_TOKEN.code,
                NO_TOKEN.customCode
            );
        }

        jwtVerifyHelper(token, token_secret);

        const userWithToken = await oauthService.getUserWithTokenPair({ [token_name]: token });

        if (!userWithToken) {
            throw new ErrorHandler(
                ENTITY_NOT_FOUND.message,
                ENTITY_NOT_FOUND.code,
                ENTITY_NOT_FOUND.customCode
            );
        }

        if (token_name === ACCESS_TOKEN && +userId !== userWithToken.id) {
            throw new ErrorHandler(
                PERMISSION_DENIED.message,
                PERMISSION_DENIED.code,
                PERMISSION_DENIED.customCode
            );
        }

        req.user = userWithToken.dataValues;

        next();
    } catch (e) {
        next(e);
    }
};
