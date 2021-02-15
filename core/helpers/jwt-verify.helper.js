const jwt = require('jsonwebtoken');

const {
    ErrorHandler,
    customErrors: { NOT_VALID_TOKEN }
} = require('../errors');

module.exports = (token, token_secret) => {
    jwt.verify(token, token_secret, (err) => {
        if (err) {
            throw new ErrorHandler(
                NOT_VALID_TOKEN.message,
                NOT_VALID_TOKEN.code,
                NOT_VALID_TOKEN.customCode
            );
        }
    });
};
