const { emailActionsEnum: { ACTIVATE_ACCOUNT, FORGOT_PASSWORD, RESTORE_USER } } = require('../constants');

module.exports = {
    [ACTIVATE_ACCOUNT]: {
        subject: 'activate your account',
        templateName: 'activate-account'
    },

    [FORGOT_PASSWORD]: {
        subject: 'reset your password',
        templateName: 'forgot-password'
    },

    [RESTORE_USER]: {
        subject: 'restore your account',
        templateName: 'restore-user'
    }
};
