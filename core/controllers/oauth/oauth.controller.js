const { tokenizer, transactionHelper: { transactionInstance } } = require('../../helpers');
const { oauthService } = require('../../services');
const {
    appEnum: { AUTHORIZATION },
    statusCodesEnum: { CREATED, NO_CONTENT }
} = require('../../constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.user;

            const token_pair = tokenizer();

            await oauthService.createTokenPair({ ...token_pair, user_id: id });

            res.json({ ...req.user, ...token_pair });
        } catch (e) {
            next(e);
        }
    },

    refreshTokenPair: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { userId } = req;
            const refresh_token = req.get(AUTHORIZATION);

            const token_pair = tokenizer();

            await oauthService.deleteTokenPair({ refresh_token }, transaction);
            await oauthService.createTokenPair({ ...token_pair, user_id: userId }, transaction);

            await transaction.commit();

            res.sendStatus(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await oauthService.deleteTokenPair({ access_token });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
