const { hash, compare } = require('bcrypt');

const {
    customErrors: {
        WRONG_EMAIL_OR_PASSWORD
    },
    ErrorHandler
} = require('../errors');

module.exports = {
    hash: (password) => hash(password, 10),
    compare: async (password, hashedPassword) => {
        const isEqual = await compare(password, hashedPassword);

        if (!isEqual) {
            throw new ErrorHandler(
                WRONG_EMAIL_OR_PASSWORD.message,
                WRONG_EMAIL_OR_PASSWORD.statusCode,
                WRONG_EMAIL_OR_PASSWORD.customCode
            );
        }
    }
};
