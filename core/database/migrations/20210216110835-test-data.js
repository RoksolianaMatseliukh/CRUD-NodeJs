const { actionTokenHelper, passwordHelper: { hash } } = require('../../helpers');
const {
    emailActionsEnum: { ACTIVATE_ACCOUNT }, databaseEnum: {
        ACTION_TOKENS, ACCOUNT_ACTIVATED, LOGS, NOW, USER_REGISTERED, USERS
    }
} = require('../../constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(USERS, [
            {
                id: 1,
                name: 'roksi',
                surname: 'roksi',
                age: 26,
                email: 'roksi@gmail.com',
                password: await hash('111hT!h555'),
                createdAt: Sequelize.fn(NOW),
                updatedAt: Sequelize.fn(NOW)
            },

            {
                id: 2,
                name: 'lili',
                surname: 'lili',
                age: 21,
                email: 'lili@gmail.com',
                password: await hash('222hT!h555'),
                createdAt: Sequelize.fn(NOW),
                updatedAt: Sequelize.fn(NOW)
            },

            {
                id: 3,
                name: 'max',
                surname: 'max',
                age: 28,
                email: 'max@gmail.com',
                password: await hash('333hT!h555'),
                createdAt: Sequelize.fn(NOW),
                updatedAt: Sequelize.fn(NOW)
            }
        ]);

        await queryInterface.bulkInsert(ACTION_TOKENS, [
            {
                id: 1,
                user_id: 1,
                action_name: ACTIVATE_ACCOUNT,
                token: actionTokenHelper(ACTIVATE_ACCOUNT),
                status: true
            },

            {
                id: 2,
                user_id: 2,
                action_name: ACTIVATE_ACCOUNT,
                token: actionTokenHelper(ACTIVATE_ACCOUNT),
                status: true
            },

            {
                id: 3,
                user_id: 3,
                action_name: ACTIVATE_ACCOUNT,
                token: actionTokenHelper(ACTIVATE_ACCOUNT),
                status: true
            }
        ]);

        await queryInterface.bulkInsert(LOGS, [
            {
                id: 1,
                user_id: 1,
                log_name: USER_REGISTERED,
                created_at: Sequelize.fn(NOW)
            },

            {
                id: 2,
                user_id: 2,
                log_name: USER_REGISTERED,
                created_at: Sequelize.fn(NOW)
            },

            {
                id: 3,
                user_id: 3,
                log_name: USER_REGISTERED,
                created_at: Sequelize.fn(NOW)
            },

            {
                id: 4,
                user_id: 1,
                log_name: ACCOUNT_ACTIVATED,
                created_at: Sequelize.fn(NOW)
            },

            {
                id: 5,
                user_id: 2,
                log_name: ACCOUNT_ACTIVATED,
                created_at: Sequelize.fn(NOW)
            },

            {
                id: 6,
                user_id: 3,
                log_name: ACCOUNT_ACTIVATED,
                created_at: Sequelize.fn(NOW)
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(USERS, {
            id: {
                [Sequelize.Op.between]: [
                    1,
                    3
                ]
            }
        }, {});
    }
};
