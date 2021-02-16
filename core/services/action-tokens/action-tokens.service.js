const { ActionTokenModel } = require('../../database/models');

module.exports = {
    getActionTokenByParams: (where) => ActionTokenModel.findOne({
        where
    }),

    createActionToken: (action_token, transaction) => ActionTokenModel.create(action_token, {
        transaction
    }),

    confirmActionToken: async (token) => {
        await ActionTokenModel.update({ status: true }, {
            where: { token }
        });
    },

    deleteActionToken: (where, transaction) => ActionTokenModel.destroy({
        where,
        transaction
    }),
};
