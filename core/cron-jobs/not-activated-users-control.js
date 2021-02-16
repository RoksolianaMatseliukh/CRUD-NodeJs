// const dayjs = require('dayjs');
// const { Sequelize: { Op } } = require('sequelize');

// const { usersService } = require('../services');
// const {
//     cronJobsEnum: { NOT_ACTIVATED_USERS_MSG },
//     dateEnum: { DAYS },
//     appEnum: { NOT_ACTIVATED_USERS_CONTROL },
//     emailActionsEnum: { ACTIVATE_ACCOUNT }
// } = require('../constants');
// const { appConfigs: { NOT_ACTIVATED_USERS_FOR_CRON } } = require('../configs');
// const winston = require('../logger');
//
// const logger = winston(NOT_ACTIVATED_USERS_CONTROL);

module.exports = async () => {
    // const numOfDeletedNotActivatedUsers = await usersService.deleteNotActivatedUsers({
    //     action_name: ACTIVATE_ACCOUNT,
    //     created_at: {
    //         [Op.lte]: dayjs().subtract(1, 'second').toISOString()
    //     },
    //     // status: false
    // });
    //
    // logger.info(`${numOfDeletedNotActivatedUsers} ${NOT_ACTIVATED_USERS_MSG}`);
};
