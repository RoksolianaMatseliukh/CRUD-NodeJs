const { ACTIVATE_ACCOUNT, FORGOT_PASSWORD, RESTORE_USER } = require('./email-actions.enum');
const {
    appConfigs: {
        ACTIVATE_ACCOUNT_EXPIRES_IN,
        ACTIVATE_ACCOUNT_SECRET,
        FORGOT_PASSWORD_EXPIRES_IN,
        FORGOT_PASSWORD_SECRET,
        RESTORE_USER_EXPIRES_IN,
        RESTORE_USER_SECRET
    }
} = require('../configs');

module.exports = {
    [ACTIVATE_ACCOUNT]: {
        expiresIn: ACTIVATE_ACCOUNT_EXPIRES_IN,
        secretKey: ACTIVATE_ACCOUNT_SECRET
    },

    [FORGOT_PASSWORD]: {
        expiresIn: FORGOT_PASSWORD_EXPIRES_IN,
        secretKey: FORGOT_PASSWORD_SECRET
    },

    [RESTORE_USER]: {
        expiresIn: RESTORE_USER_EXPIRES_IN,
        secretKey: RESTORE_USER_SECRET
    }
};
