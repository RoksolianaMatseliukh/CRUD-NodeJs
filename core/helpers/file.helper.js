const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { appEnum: { AVATAR, PUBLIC, USERS } } = require('../constants');

module.exports = {
    uploadAvatar: async (avatar, id) => {
        const avatarDirPath = path.join(USERS, `${id}`, AVATAR);
        const avatarFullDirPath = path.join(process.cwd(), PUBLIC, avatarDirPath);

        const avatarExtension = avatar.name.split('.').pop();

        const avatarName = `${uuid.v1()}.${avatarExtension}`;
        const avatarPath = path.join(avatarDirPath, avatarName);

        await fs.mkdir(avatarFullDirPath, { recursive: true });
        await avatar.mv(path.join(avatarFullDirPath, avatarName));

        return avatarPath;
    },

    changeUserAvatar: async (avatar, existingAvatarPath, id) => {
        const avatarDirPath = path.join(USERS, `${id}`, AVATAR);
        const avatarFullDirPath = path.join(process.cwd(), PUBLIC, avatarDirPath);

        const avatarExtension = avatar.name.split('.').pop();

        const avatarName = `${uuid.v1()}.${avatarExtension}`;
        const avatarPath = path.join(avatarDirPath, avatarName);

        if (!existingAvatarPath) {
            await fs.mkdir(avatarFullDirPath, { recursive: true });
        } else {
            await fs.unlink(path.join(process.cwd(), PUBLIC, existingAvatarPath));
        }

        await avatar.mv(path.join(avatarFullDirPath, avatarName));

        return avatarPath;
    }
};
