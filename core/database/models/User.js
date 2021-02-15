const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../index');
const { databaseEnum: { ASSOCIATION, USERS } } = require('../../constants');
const ActionToken = require('./ActionToken');
const Log = require('./Log');
const OAuth = require('./OAuth');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        avatar: {
            type: DataTypes.STRING
        }
    },
    {
        paranoid: true,
        sequelize,
        tableName: USERS
    }
);

User.hasMany(ActionToken, ASSOCIATION);
User.hasMany(Log, ASSOCIATION);
User.hasMany(OAuth, ASSOCIATION);

module.exports = User;
