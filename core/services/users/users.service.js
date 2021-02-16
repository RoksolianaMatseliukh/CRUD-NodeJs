const { Sequelize: { col } } = require('sequelize');

const { UserModel } = require('../../database/models');
const { databaseEnum: { AGE, EMAIL, PASSWORD } } = require('../../constants');

module.exports = {
    createUser: (user, transaction) => UserModel.create(user, {
        transaction
    }),

    getUsers: (where, offset, limit, ...attributesToExclude) => UserModel.findAll({
        attributes: {
            exclude: attributesToExclude
        },
        where,
        paranoid: false,
        order: col(AGE),
        offset,
        limit
    }),

    getUserById: (id) => UserModel.findByPk(id, {
        attributes: {
            exclude: [
                EMAIL,
                PASSWORD
            ]
        },
        paranoid: false
    }),

    getUserCount: () => UserModel.count({
        paranoid: false
    }),

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

    // deleteNotActivatedUsers: (where) => {
    //     return UserModel.destroy({
    //         include: { model: ActionTokenModel, where },
    //         force: true
    //     });
    // },

    restoreUserById: async (id, transaction) => {
        await UserModel.restore({
            where: { id },
            transaction
        });
    }
};
