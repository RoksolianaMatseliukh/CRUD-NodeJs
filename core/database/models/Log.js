const { DataTypes, Model, Sequelize: { fn } } = require('sequelize');

const { sequelize } = require('../index');
const { databaseEnum: { LOGS, NOW } } = require('../../constants');

class Log extends Model { }

Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },

        log_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            defaultValue: fn(NOW)
        }
    },
    {
        sequelize,
        tableName: LOGS,
        timestamps: false
    }
);

module.exports = Log;
