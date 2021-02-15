module.exports = class ErrorHandler extends Error {
    constructor(message, statusCode, customCode) {
        super(message);
        this.statusCode = statusCode;
        this.customCode = customCode;

        Error.captureStackTrace(this, this.constructor);
    }
};
