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
        include: { model: OAuthModel, where }
    }),

    deleteTokenPair: (where, transaction) => OAuthModel.destroy({
        where,
        transaction
    })
};
