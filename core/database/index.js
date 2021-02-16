const { Sequelize } = require('sequelize');

const {
    appConfigs: {
        DATABASE_NAME,
        DATABASE_PASSWORD,
        DATABASE_USER
    }
} = require('../configs');
const {
    databaseEnum: {
        DIALECT,
        HOST
    }
} = require('../constants');

module.exports.sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    dialect: DIALECT,
    host: HOST,
    logging: false
});
