const { DataTypes, Model, Sequelize: { fn } } = require('sequelize');

const { sequelize } = require('../index');
const { databaseEnum: { NOW, OAUTH } } = require('../../constants');

class OAuth extends Model { }

OAuth.init(
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

        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        refresh_token: {
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
        tableName: OAUTH,
        timestamps: false
    }
);

module.exports = OAuth;
