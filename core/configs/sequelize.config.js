require('dotenv').config({ path: '../.env' });

const { appConfigs: { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } } = require('./index');
const { databaseEnum: { HOST, DIALECT } } = require('../constants');

module.exports = {
    development: {
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: HOST,
        dialect: DIALECT
    }
};
