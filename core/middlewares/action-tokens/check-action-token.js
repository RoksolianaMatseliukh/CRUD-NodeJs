const jwt = require('jsonwebtoken');

const { actionTokensService } = require('../../services');
const {
    ErrorHandler,
    customErrors: { NO_TOKEN, NOT_VALID_TOKEN }
} = require('../../errors');
const {
    appEnum: { AUTHORIZATION },
    emailActionsEnum: { ACTIVATE_ACCOUNT, RESTORE_USER }
} = require('../../constants');
const { jwtVerifyHelper } = require('../../helpers');

module.exports = (token_name, token_secret) => async (req, res, next) => {
    try {
        let actionToken;

        if (token_name === ACTIVATE_ACCOUNT || token_name === RESTORE_USER) {
            const { token } = req.params;
            actionToken = token;
        } else {
            actionToken = req.get(AUTHORIZATION);
        }

        if (!actionToken) {
            throw new ErrorHandler(
                NO_TOKEN.message,
                NO_TOKEN.code,
                NO_TOKEN.customCode
            );
        }

        jwtVerifyHelper(actionToken, token_secret);

        const action_token = await actionTokensService.getActionTokenByParams({ token: actionToken });

        if (!action_token) {
            throw new ErrorHandler(
                NOT_VALID_TOKEN.message,
                NOT_VALID_TOKEN.code,
                NOT_VALID_TOKEN.customCode
            );
        }

        req.actionToken = action_token;

        next();
    } catch (e) {
        next(e);
    }
};
