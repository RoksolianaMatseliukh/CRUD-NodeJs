const { Router } = require('express');

const { actionTokenMiddlewares, oauthMiddlewares, usersMiddlewares } = require('../../middlewares');
const { actionTokensController, oauthController } = require('../../controllers');
const { usersValidators: { userToLoginValidator } } = require('../../validators');
const {
    appConfigs: {
        ACTIVATE_ACCOUNT_SECRET,
        FORGOT_PASSWORD_SECRET,
        REFRESH_SECRET, RESTORE_USER_SECRET
    }
} = require('../../configs');
const {
    appEnum: {
        REFRESH_TOKEN
    },
    emailActionsEnum: {
        ACTIVATE_ACCOUNT,
        FORGOT_PASSWORD,
        RESTORE_USER
    }
} = require('../../constants');

const oauthRouter = Router();

oauthRouter.post('/',
    usersMiddlewares.checkIsUserBodyValid(userToLoginValidator),
    oauthMiddlewares.checkUserByEmail,
    oauthMiddlewares.checkIsUserAccountActivated,
    oauthMiddlewares.checkPasswordHash,
    oauthController.login);

oauthRouter.get('/activate/:token',
    actionTokenMiddlewares.checkActionToken(ACTIVATE_ACCOUNT, ACTIVATE_ACCOUNT_SECRET),
    actionTokensController.activateAccount);

oauthRouter.post('/restore/account/:userId',
    actionTokenMiddlewares.checkIsEmailValid,
    // oauthMiddlewares.checkToken(ACCESS_TOKEN, ACCESS_SECRET),
    actionTokensController.createActionTokenRestoreUser);

oauthRouter.get('/restore/:token',
    actionTokenMiddlewares.checkActionToken(RESTORE_USER, RESTORE_USER_SECRET),
    actionTokensController.restoreUser);

oauthRouter.post('/refresh',
    oauthMiddlewares.checkToken(REFRESH_TOKEN, REFRESH_SECRET),
    oauthController.refreshTokenPair);

oauthRouter.post('/password/forgot',
    actionTokenMiddlewares.checkIsEmailValid,
    actionTokensController.createActionTokenForgotPassword);

oauthRouter.post('/password/reset',
    actionTokenMiddlewares.checkArePasswordsEqualValid,
    actionTokenMiddlewares.checkActionToken(FORGOT_PASSWORD, FORGOT_PASSWORD_SECRET),
    actionTokensController.forgotPasswordSetNew);

oauthRouter.post('/logout',
    oauthController.logout);

module.exports = oauthRouter;