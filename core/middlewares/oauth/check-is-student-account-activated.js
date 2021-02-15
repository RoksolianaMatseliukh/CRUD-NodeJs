const { actionTokensService } = require('../../services');
const { ErrorHandler, customErrors: { USER_NOT_CONFIRMED } } = require('../../errors');
const { emailActionsEnum: { ACTIVATE_ACCOUNT } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { status } = await actionTokensService.getActionTokenByParams({ action_name: ACTIVATE_ACCOUNT, user_id: id });

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
