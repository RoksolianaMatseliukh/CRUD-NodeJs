const { Sequelize: { Op } } = require('sequelize');

const { usersService } = require('../services');

module.exports = async (queries) => {
    const where = {
        limit: await usersService.getUserCount(),
        offset: 0
    };

    if (+queries.limit) {
        where.limit = +queries.limit;
    }

    if (+queries.offset) {
        where.offset = where.limit * (queries.page - 1);
    }

    if (+queries.age_gte) {
        where.age = {
            age: {
                [Op.gte]: +queries.age_gte
            }
        };
    }

    if (queries.ids) {
        const ids = queries.ids.split(',');

        where.id = {
            id: {
                [Op.in]: ids
            }
        };
    }

    if (queries.name) {
        where.name = {
            name: {
                [Op.substring]: queries.name
            }
        };
    }

    return where;
};
