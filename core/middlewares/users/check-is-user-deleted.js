const { actionTokensService } = require('../../services');
const { ErrorHandler, customErrors: { USER_DELETED } } = require('../../errors');
const { emailActionsEnum: { RESTORE_USER } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const deletedUser = await actionTokensService.getActionTokenByParams({ action_name: RESTORE_USER, user_id: userId });

        if (deletedUser) {
            throw new ErrorHandler(
                USER_DELETED.message,
                USER_DELETED.statusCode,
                USER_DELETED.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
