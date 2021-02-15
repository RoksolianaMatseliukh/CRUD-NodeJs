module.exports = {
    PORT: process.env.PORT || 5000,

    DATABASE_NAME: process.env.DATABASE_NAME || 'name',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'name',
    DATABASE_USER: process.env.DATABASE_USER || 'name',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'access_secret',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'refresh_secret',
    ACTIVATE_ACCOUNT_SECRET: process.env.ACTIVATE_ACCOUNT_SECRET || 'activate_secret',
    FORGOT_PASSWORD_SECRET: process.env.FORGOT_PASSWORD_SECRET || 'password_secret',
    RESTORE_USER_SECRET: process.env.RESTORE_USER_SECRET || 'restore_secret',

    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || '30m',
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || '7d',
    ACTIVATE_ACCOUNT_EXPIRES_IN: process.env.ACTIVATE_ACCOUNT_EXPIRES_IN || '30d',
    FORGOT_PASSWORD_EXPIRES_IN: process.env.FORGOT_PASSWORD_EXPIRES_IN || '1d',
    RESTORE_USER_EXPIRES_IN: process.env.RESTORE_USER_EXPIRES_IN || '60d',

    EMAIL_TRANSPORTER_PASSWORD: process.env.EMAIL_TRANSPORTER_PASS || 'pass',
    EMAIL_TRANSPORTER_SERVICE: process.env.EMAIL_TRANSPORTER_SERVICE || 'service',
    EMAIL_TRANSPORTER_USER: process.env.EMAIL_TRANSPORTER_USER || 'user'
};
