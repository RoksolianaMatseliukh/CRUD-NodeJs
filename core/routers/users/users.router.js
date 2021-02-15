const { Router } = require('express');

const { usersController } = require('../../controllers');
const { filesMiddlewares, oauthMiddlewares, usersMiddlewares } = require('../../middlewares');
const { usersValidators: { createNewUserValidator, updateUserValidator } } = require('../../validators');
const { appConfigs: { ACCESS_SECRET } } = require('../../configs');
const { appEnum: { ACCESS_TOKEN } } = require('../../constants');

const usersRouter = Router();

usersRouter.post('/',
    usersMiddlewares.checkIsUserBodyValid(createNewUserValidator),
    filesMiddlewares.checkFileExtensionsCount,
    filesMiddlewares.checkNumberOfUserAvatar,
    usersMiddlewares.checkIfUserAlreadyExists,
    usersController.createUser);

usersRouter.get('/',
    usersMiddlewares.checkUserByQueries,
    usersController.getUsers);

usersRouter.get('/:userId',
    usersMiddlewares.checkIsUserIdValid,
    usersMiddlewares.checkIsUserDeleted,
    usersMiddlewares.checkUserByParams,
    usersController.getUserById);

usersRouter.put('/:userId',
    usersMiddlewares.checkIsUserIdValid,
    usersMiddlewares.checkIsUserDeleted,
    usersMiddlewares.checkIsUserBodyValid(updateUserValidator),
    filesMiddlewares.checkFileExtensionsCount,
    filesMiddlewares.checkNumberOfUserAvatar,
    // oauthMiddlewares.checkToken(ACCESS_TOKEN, ACCESS_SECRET),
    usersController.updateUserById);

usersRouter.delete('/:userId',
    usersMiddlewares.checkIsUserIdValid,
    usersMiddlewares.checkIsUserDeleted,
    oauthMiddlewares.checkToken(ACCESS_TOKEN, ACCESS_SECRET),
    usersController.deleteUserById);

module.exports = usersRouter;
