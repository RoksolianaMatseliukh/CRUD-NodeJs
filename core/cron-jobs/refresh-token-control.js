const dayjs = require('dayjs');
const { Sequelize: { Op } } = require('sequelize');

const { oauthService } = require('../services');
const {
    cronJobsEnum: { REFRESH_TOKEN_CONTROL_MSG },
    dateEnum: { DAYS },
    appEnum: { REFRESH_TOKEN_CONTROL }
} = require('../constants');
const { appConfigs: { REFRESH_EXPIRES_IN_FOR_CRON } } = require('../configs');
const winston = require('../logger');

const logger = winston(REFRESH_TOKEN_CONTROL);

module.exports = async () => {
    const numOfDeletedTokenPairs = await oauthService.deleteTokenPair({
        created_at: {
            [Op.lte]: dayjs().subtract(REFRESH_EXPIRES_IN_FOR_CRON, DAYS).toISOString()
        }
    });

    logger.info(`${numOfDeletedTokenPairs} ${REFRESH_TOKEN_CONTROL_MSG}`);
};
