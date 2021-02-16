const dayjs = require('dayjs');
const { Sequelize: { Op } } = require('sequelize');

const {
    cronJobsEnum: { ACTIVATED_USERS_MSG },
    databaseEnum: { ACCOUNT_ACTIVATED },
    dateEnum: { DAY },
    appEnum: { ACTIVATED_USERS_CONTROL }
} = require('../constants');
const { logsService } = require('../services');
const winston = require('../logger');

const logger = winston(ACTIVATED_USERS_CONTROL);

module.exports = async () => {
    const numOfActivatedUsers = await logsService.getNumberOfLogs({
        created_at: {
            [Op.gt]: dayjs().subtract(1, DAY).toISOString()
        },
        log_name: ACCOUNT_ACTIVATED
    });

    logger.info(`${numOfActivatedUsers} ${ACTIVATED_USERS_MSG}`);
};
