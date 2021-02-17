const fs = require('fs-extra').promises;
const path = require('path');

const {
    actionTokensService,
    emailService,
    logsService,
    usersService
} = require('../../services');
const {
    actionTokenHelper,
    passwordHelper: {
        hash
    },
    fileHelper,
    transactionHelper: {
        transactionInstance
    }
} = require('../../helpers');
const {
    appEnum: {
        PUBLIC,
        USERS
    },
    databaseEnum: {
        USER_REGISTERED,
        USER_SOFT_DELETED
    },
    emailActionsEnum: {
        ACTIVATE_ACCOUNT,
        RESTORE_USER
    },
    statusCodesEnum: {
        CREATED,
        NO_CONTENT
    },
    responseMessagesEnum: {
        ENTITY_CREATED,
        ENTITY_EDITED
    }
} = require('../../constants');

module.exports = {
    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                avatar,
                body: { email, name, password }
            } = req;

            const hashedPassword = await hash(password);
            const token = actionTokenHelper(ACTIVATE_ACCOUNT);

            const { id } = await usersService.createUser({ ...req.body, password: hashedPassword }, transaction);
            await actionTokensService.createActionToken({ action_name: ACTIVATE_ACCOUNT, token, user_id: id }, transaction);
            await logsService.createLog({ log_name: USER_REGISTERED, user_id: id }, transaction);

            if (avatar) {
                const avatarPath = await fileHelper.uploadAvatar(avatar, id);
                await usersService.updateUserById(id, { avatar: avatarPath }, transaction);
            }

            await emailService.sendEmail(email, ACTIVATE_ACCOUNT, { token, user_name: name });

            await transaction.commit();

            res.status(CREATED).json(ENTITY_CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    getUsers: (req, res, next) => {
        try {
            res.json(req.message || req.users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {
                avatar,
                params: { userId },
                user: { avatar: existingAvatarPath }
            } = req;

            if (avatar) {
                req.body.avatar = await fileHelper.changeUserAvatar(avatar, existingAvatarPath, userId);
            }

            await usersService.updateUserById(userId, req.body);

            res.status(CREATED).json(ENTITY_EDITED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                params: { userId },
                user: { name, email, avatar }
            } = req;

            const token = actionTokenHelper(RESTORE_USER);

            await usersService.deleteUserById(userId, transaction);
            await actionTokensService.createActionToken({ action_name: RESTORE_USER, token, user_id: userId }, transaction);
            await logsService.createLog({ log_name: USER_SOFT_DELETED, user_id: userId }, transaction);

            await emailService.sendEmail(email, RESTORE_USER, { token, user_name: name });

            if (avatar) {
                await fs.rmdir(path.join(process.cwd(), PUBLIC, USERS, userId), { recursive: true });
            }

            await transaction.commit();

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
