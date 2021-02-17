const cron = require('node-cron');

const { cronJobsEnum: { EVERY_DAY_AT_00_00, EVERY_DAY_AT_4_AM } } = require('../constants');
const refreshTokenControl = require('./refresh-token-control');
const activatedUsersControl = require('./activated-users-control');

module.exports = () => {
    cron.schedule(EVERY_DAY_AT_00_00, async () => {
        await activatedUsersControl();
    });

    cron.schedule(EVERY_DAY_AT_4_AM, async () => {
        await refreshTokenControl();
    });
};
