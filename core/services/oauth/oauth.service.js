const { OAuthModel, UserModel } = require('../../database/models');
const { databaseEnum: { PASSWORD } } = require('../../constants');

module.exports = {
    createTokenPair: async (token_pair, transaction) => {
        await OAuthModel.create(token_pair, {
            transaction
        });
    },

    getUserWithTokenPair: (where) => UserModel.findOne({
        attributes: {
            exclude: PASSWORD
        },
        include: { model: OAuthModel, where },
        paranoid: false
    }),

    deleteTokenPair: async (where, transaction) => {
        await OAuthModel.destroy({
            where,
            paranoid: false,
            transaction
        });
    }
};
