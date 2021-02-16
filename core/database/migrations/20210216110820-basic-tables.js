const {
    databaseEnum: {
        ACTION_TOKENS, LOGS, NOW, OAUTH, USERS
    }
} = require('../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(USERS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            surname: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            age: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },

            avatar: {
                type: Sequelize.DataTypes.STRING
            },

            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },

            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },

            deletedAt: {
                type: Sequelize.DataTypes.DATE,
            }
        });

        await queryInterface.createTable(ACTION_TOKENS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false,
                references: {
                    model: USERS,
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },

            action_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false
            },

            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
            }
        });

        await queryInterface.createTable(LOGS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: USERS,
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },

            log_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
            }
        });

        await queryInterface.createTable(OAUTH, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: USERS,
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },

            access_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            refresh_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(USERS);
        await queryInterface.dropTable(ACTION_TOKENS);
        await queryInterface.dropTable(LOGS);
        await queryInterface.dropTable(OAUTH);
    }
};
