const { sequelize } = require('../database');

module.exports.transactionInstance = () => sequelize.transaction();
