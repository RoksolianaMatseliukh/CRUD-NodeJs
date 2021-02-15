const { appConfigs: { PORT } } = require('../configs');

module.exports = {
    APP_IN_PROCESS: `app ${PORT} in process`,

    // folder names
    AVATAR: 'avatar',
    EMAIL_TEMPLATES: 'email-templates',
    INNER_TEMPLATES: 'inner-templates',
    PUBLIC: 'public',
    USERS: 'users',

    // token names
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',

    AUTHORIZATION: 'Authorization'
};
