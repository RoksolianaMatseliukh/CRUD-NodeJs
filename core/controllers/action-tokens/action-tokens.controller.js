const {
    actionTokensService, emailService, logsService, usersService
} = require('../../services');
const {
    databaseEnum: {
        ACCOUNT_ACTIVATED, FORGOT_PASSWORD: FORGOT_PASSWORD_LOG, PASSWORD_CHANGED, USER_RESTORED, USER_TO_RESTORE
    },
    emailActionsEnum: { FORGOT_PASSWORD, RESTORE_USER },
    statusCodesEnum: { CREATED }
} = require('../../constants');
const {
    actionTokenHelper,
    passwordHelper: { hash },
    transactionHelper: { transactionInstance }
} = require('../../helpers');

module.exports = {
    activateAccount: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { token, user_id } = req.actionToken;

            await actionTokensService.confirmActionToken(token);
            await logsService.createLog({ log_name: ACCOUNT_ACTIVATED, user_id }, transaction);

            await transaction.commit();

            res.sendStatus(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    createActionTokenForgotPassword: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                user: { email, id, name },
            } = req;

            const token = actionTokenHelper(FORGOT_PASSWORD);

            await actionTokensService.createActionToken({ action_name: FORGOT_PASSWORD, token, user_id: id }, transaction);
            await logsService.createLog({ log_name: FORGOT_PASSWORD_LOG, user_id: id }, transaction);

            await emailService.sendEmail(email, FORGOT_PASSWORD, { token, user_name: name });

            await transaction.commit();

            res.sendStatus(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    forgotPasswordSetNew: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                body: { password },
                actionToken: { token, user_id }
            } = req;

            const hashedPassword = await hash(password);

            await actionTokensService.deleteActionToken({ token }, transaction);
            await usersService.updateUserById(user_id, { password: hashedPassword }, transaction);
            await logsService.createLog({ log_name: PASSWORD_CHANGED, user_id }, transaction);

            await transaction.commit();

            res.sendStatus(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    createActionTokenRestoreUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                user: { email, id, name },
            } = req;

            const token = actionTokenHelper(RESTORE_USER);

            await actionTokensService.createActionToken({ action_name: RESTORE_USER, token, user_id: id }, transaction);
            await logsService.createLog({ log_name: USER_TO_RESTORE, user_id: id }, transaction);

            await emailService.sendEmail(email, RESTORE_USER, { token, user_name: name });

            await transaction.commit();

            res.sendStatus(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    restoreUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                actionToken: { token, user_id }
            } = req;

            await actionTokensService.deleteActionToken({ token }, transaction);
            await logsService.createLog({ log_name: USER_RESTORED, user_id }, transaction);
            await usersService.restoreUserById(user_id, transaction);

            await transaction.commit();

            res.sendStatus(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
