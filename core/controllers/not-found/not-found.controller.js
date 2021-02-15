const { ErrorHandler, customErrors: { ROUTE_NOT_FOUND } } = require('../../errors');

module.exports = {
    catchAllNotFoundRoutes: (req, res, next) => {
        try {
            throw new ErrorHandler(
                ROUTE_NOT_FOUND.message,
                ROUTE_NOT_FOUND.statusCode,
                ROUTE_NOT_FOUND.customCode
            );
        } catch (e) {
            next(e);
        }
    }
};
