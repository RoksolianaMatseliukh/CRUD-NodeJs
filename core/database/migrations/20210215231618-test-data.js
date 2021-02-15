const { Sequelize: { fn } } = require('sequelize');

const { passwordHelper: { hash } } = require('../../helpers');
const { appEnum: { USERS }, databaseEnum: { NOW } } = require('../../constants');

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
                createdAt: fn(NOW),
                updatedAt: fn(NOW)
            },
            {
                id: 2,
                name: 'lili',
                surname: 'lili',
                age: 21,
                email: 'lili@gmail.com',
                password: await hash('222hT!h555'),
                createdAt: fn(NOW),
                updatedAt: fn(NOW)
            },
            {
                id: 3,
                name: 'max',
                surname: 'max',
                age: 28,
                email: 'max@gmail.com',
                password: await hash('333hT!h555'),
                createdAt: fn(NOW),
                updatedAt: fn(NOW)
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
