module.exports = {
    DIALECT: 'mysql',
    HOST: 'localhost',

    NOW: 'now',

    // table names
    ACTION_TOKENS: 'action_tokens',
    LOGS: 'logs',
    OAUTH: 'oauth',
    USERS: 'users',

    // table attributes
    AGE: 'age',
    CREATED_AT: 'createdAt',
    DELETED_AT: 'deletedAt',
    EMAIL: 'email',
    PASSWORD: 'password',
    UPDATED_AT: 'updatedAt',

    // association (ActionToken, OAuth)
    ASSOCIATION: {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },

    // log names
    ACCOUNT_ACTIVATED: 'account_activated',
    FORGOT_PASSWORD: 'forgot_password',
    PASSWORD_CHANGED: 'password_changed',
    USER_REGISTERED: 'user_registered',
    USER_RESTORED: 'user_restored',
    USER_SOFT_DELETED: 'user_soft_deleted',
    USER_TO_RESTORE: 'user_to_restore'
};
