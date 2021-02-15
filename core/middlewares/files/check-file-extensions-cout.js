const {
    customErrors: {
        TOO_LARGE_FILE,
        WRONG_FILE_EXTENSION
    },
    ErrorHandler
} = require('../../errors');
const {
    uploadFilesEnum: {
        IMG_MAX_SIZE,
        IMGS_MIMETYPES
    }
} = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const files = Object.values(req.files || {});

        req.images = [];

        files.forEach((file) => {
            const { mimetype, size } = file;

            if (IMGS_MIMETYPES.includes(mimetype)) {
                if (size > IMG_MAX_SIZE) {
                    throw new ErrorHandler(
                        TOO_LARGE_FILE.message,
                        TOO_LARGE_FILE.statusCode,
                        TOO_LARGE_FILE.customCode
                    );
                }

                req.images.push(file);
            } else {
                throw new ErrorHandler(
                    WRONG_FILE_EXTENSION.message,
                    WRONG_FILE_EXTENSION.statusCode,
                    WRONG_FILE_EXTENSION.customCode
                );
            }
        });

        next();
    } catch (e) {
        next(e);
    }
};
