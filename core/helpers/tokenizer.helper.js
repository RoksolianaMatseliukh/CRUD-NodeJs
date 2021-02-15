const jwt = require('jsonwebtoken');

const {
    appConfigs: {
        ACCESS_SECRET,
        REFRESH_SECRET,
        ACCESS_EXPIRES_IN,
        REFRESH_EXPIRES_IN
    }
} = require('../configs');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
    const refresh_token = jwt.sign({}, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

    return {
        access_token,
        refresh_token
    };
};
