const { DataTypes, Model, Sequelize: { fn } } = require('sequelize');

const { sequelize } = require('../index');
const { databaseEnum: { ACTION_TOKENS, NOW } } = require('../../constants');

class ActionToken extends Model { }

ActionToken.init(
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

        action_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        created_at: {
            type: DataTypes.DATE,
            defaultValue: fn(NOW)
        }
    },
    {
        sequelize,
        tableName: ACTION_TOKENS,
        timestamps: false
    }
);

module.exports = ActionToken;
