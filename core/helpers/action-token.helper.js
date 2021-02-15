const jwt = require('jsonwebtoken');

const { actionTokenEnum } = require('../constants');

module.exports = (actionName) => {
    const { expiresIn, secretKey } = actionTokenEnum[actionName];

    return jwt.sign({}, secretKey, { expiresIn });
};
