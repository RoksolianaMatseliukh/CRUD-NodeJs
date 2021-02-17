const { Sequelize: { col } } = require('sequelize');

const { UserModel } = require('../../database/models');
const {
    databaseEnum: {
        AGE, CREATED_AT, DELETED_AT, EMAIL, PASSWORD, UPDATED_AT
    }
} = require('../../constants');

module.exports = {
    createUser: (user, transaction) => UserModel.create(user, {
        transaction
    }),

    getUsers: (where, offset, limit, ...attributesToExclude) => UserModel.findAll({
        attributes: {
            exclude: [
                CREATED_AT,
                DELETED_AT,
                UPDATED_AT,
                ...attributesToExclude
            ]
        },
        where,
        order: col(AGE),
        offset,
        limit
    }),

    getUserByEmail: (email) => UserModel.findOne({
        attributes: {
            exclude: [
                CREATED_AT,
                DELETED_AT,
                UPDATED_AT,
            ]
        },
        where: { email },
        paranoid: false
    }),

    getUserById: (id) => UserModel.findByPk(id, {
        attributes: {
            exclude: [
                EMAIL,
                PASSWORD,
                CREATED_AT,
                DELETED_AT,
                UPDATED_AT,
            ]
        }
    }),

    getUserCount: () => UserModel.count(),

    updateUserById: async (id, updatedFields, transaction) => {
        await UserModel.update(updatedFields, {
            where: { id },
            transaction
        });
    },

    deleteUserById: async (id, transaction) => {
        await UserModel.destroy({
            where: { id },
            transaction
        });
    },

    restoreUserById: async (id, transaction) => {
        await UserModel.restore({
            where: { id },
            transaction
        });
    }
};
