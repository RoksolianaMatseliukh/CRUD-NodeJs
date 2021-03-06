const { LogModel } = require('../../database/models');

module.exports = {
    createLog: (log, transaction) => LogModel.create(log, {
        transaction
    }),

    getNumberOfLogs: (where) => LogModel.count({
        where
    })
};
