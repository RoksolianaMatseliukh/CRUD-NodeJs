const { actionTokensService } = require('../../services');
const { ErrorHandler, customErrors: { USER_NOT_CONFIRMED } } = require('../../errors');
const { emailActionsEnum: { ACTIVATE_ACCOUNT } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        // for login
        const { id } = req.user || {};
        // for other actions
        const { userId } = req.params;

        const { status } = await actionTokensService.getActionTokenByParams(
            { action_name: ACTIVATE_ACCOUNT, user_id: id || userId }
        ) || {};

        if (!status) {
            throw new ErrorHandler(
                USER_NOT_CONFIRMED.message,
                USER_NOT_CONFIRMED.statusCode,
                USER_NOT_CONFIRMED.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
