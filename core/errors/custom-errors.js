const {
    responseMessagesEnum: {
        EMAIL_NOT_VALID,
        ENTITY_ALREADY_EXISTS,
        ENTITY_NOT_FOUND,
        ENTITY_NOT_VALID,
        NO_TOKEN,
        NOT_VALID_TOKEN,
        PASSWORDS_NOT_EQUAL,
        PERMISSION_DENIED,
        ROUTE_NOT_FOUND,
        TOO_LARGE_FILE,
        WRONG_EMAIL_OR_PASSWORD,
        WRONG_FILE_EXTENSION,
        WRONG_NUMBER_OF_AVATAR,
        WRONG_TEMPLATE_NAME,
        USER_DELETED,
        USER_NOT_CONFIRMED
    },
    statusCodesEnum: {
        NOT_FOUND,
        UNAUTHORIZED,
        FORBIDDEN,
        BAD_REQUEST
    },
    customCodesEnum: {
        EMAIL_NOT_VALID_CC,
        ENTITY_ALREADY_EXISTS_CC,
        ENTITY_NOT_FOUND_CC,
        ENTITY_NOT_VALID_CC,
        NO_TOKEN_CC,
        NOT_VALID_TOKEN_CC,
        PASSWORDS_NOT_EQUAL_CC,
        PERMISSION_DENIED_CC,
        ROUTE_NOT_FOUND_CC,
        TOO_LARGE_FILE_CC,
        WRONG_EMAIL_OR_PASSWORD_CC,
        WRONG_FILE_EXTENSION_CC,
        WRONG_NUMBER_OF_AVATAR_CC,
        WRONG_TEMPLATE_NAME_CC,
        USER_DELETED_CC,
        USER_NOT_CONFIRMED_CC
    }
} = require('../constants');

module.exports = {
    // BAD REQUEST
    EMAIL_NOT_VALID: {
        customCode: EMAIL_NOT_VALID_CC,
        message: EMAIL_NOT_VALID,
        statusCode: BAD_REQUEST
    },

    ENTITY_ALREADY_EXISTS: {
        customCode: ENTITY_ALREADY_EXISTS_CC,
        message: ENTITY_ALREADY_EXISTS,
        statusCode: BAD_REQUEST
    },

    ENTITY_NOT_FOUND: {
        customCode: ENTITY_NOT_FOUND_CC,
        message: ENTITY_NOT_FOUND,
        statusCode: BAD_REQUEST
    },

    ENTITY_NOT_VALID: {
        customCode: ENTITY_NOT_VALID_CC,
        message: ENTITY_NOT_VALID,
        statusCode: BAD_REQUEST
    },

    ID_NOT_VALID: {
        customCode: ENTITY_NOT_FOUND_CC,
        message: ENTITY_NOT_FOUND,
        statusCode: BAD_REQUEST
    },

    NO_TOKEN: {
        customCode: NO_TOKEN_CC,
        message: NO_TOKEN,
        statusCode: BAD_REQUEST
    },

    PASSWORDS_NOT_EQUAL: {
        customCode: PASSWORDS_NOT_EQUAL_CC,
        message: PASSWORDS_NOT_EQUAL,
        statusCode: BAD_REQUEST
    },

    TOO_LARGE_FILE: {
        customCode: TOO_LARGE_FILE_CC,
        message: TOO_LARGE_FILE,
        statusCode: BAD_REQUEST
    },

    WRONG_EMAIL_OR_PASSWORD: {
        customCode: WRONG_EMAIL_OR_PASSWORD_CC,
        message: WRONG_EMAIL_OR_PASSWORD,
        statusCode: BAD_REQUEST
    },

    WRONG_FILE_EXTENSION: {
        customCode: WRONG_FILE_EXTENSION_CC,
        message: WRONG_FILE_EXTENSION,
        statusCode: BAD_REQUEST
    },

    WRONG_NUMBER_OF_AVATAR: {
        customCode: WRONG_NUMBER_OF_AVATAR_CC,
        message: WRONG_NUMBER_OF_AVATAR,
        statusCode: BAD_REQUEST
    },

    WRONG_TEMPLATE_NAME: {
        customCode: WRONG_TEMPLATE_NAME_CC,
        message: WRONG_TEMPLATE_NAME,
        statusCode: BAD_REQUEST
    },

    USER_NOT_CONFIRMED: {
        customCode: USER_NOT_CONFIRMED_CC,
        message: USER_NOT_CONFIRMED,
        statusCode: BAD_REQUEST
    },

    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        customCode: NOT_VALID_TOKEN_CC,
        message: NOT_VALID_TOKEN,
        statusCode: UNAUTHORIZED
    },

    // FORBIDDEN
    PERMISSION_DENIED: {
        customCode: PERMISSION_DENIED_CC,
        message: PERMISSION_DENIED,
        statusCode: FORBIDDEN
    },

    USER_DELETED: {
        customCode: USER_DELETED_CC,
        message: USER_DELETED,
        statusCode: FORBIDDEN
    },

    // NOT FOUND
    ROUTE_NOT_FOUND: {
        customCode: ROUTE_NOT_FOUND_CC,
        message: ROUTE_NOT_FOUND,
        statusCode: NOT_FOUND
    }
};
