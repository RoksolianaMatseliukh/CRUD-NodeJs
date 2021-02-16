const { FULL_CURRENT_DAY } = require('./date.enum');

module.exports = {
    EVERY_DAY_AT_00_00: '0 0 * * *',
    EVERY_DAY_AT_4_AM: '0 4 * * *',

    // crone-jobs msg
    ACTIVATED_USERS_MSG: `activated users per ${FULL_CURRENT_DAY}`,
    NOT_ACTIVATED_USERS_MSG: `deleted not activated users per ${FULL_CURRENT_DAY}`,
    REFRESH_TOKEN_CONTROL_MSG: 'token pairs was deleted'
};
