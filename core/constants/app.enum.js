const { appConfigs: { PORT } } = require('../configs');

const { CURRENT_YEAR_MONTH, FULL_CURRENT_DAY } = require('./date.enum');

module.exports = {
    APP_IN_PROCESS: `app ${PORT} in process`,

    // folder / file names
    ACTIVATED_USERS_CONTROL: 'cron-job: activated-users-control',
    APP: 'app',
    AVATAR: 'avatar',
    DAY_TXT: `${FULL_CURRENT_DAY}.txt`,
    EMAIL_TEMPLATES: 'email-templates',
    ERRORS: 'errors',
    INFORMATION: 'information',
    INNER_TEMPLATES: 'inner-templates',
    LOGS: 'logs',
    MONTH_TXT: `${CURRENT_YEAR_MONTH}.txt`,
    PUBLIC: 'public',
    REFRESH_TOKEN_CONTROL: 'cron-job: refresh-token-control',
    USERS: 'users',

    // token names
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',

    AUTHORIZATION: 'Authorization'
};
