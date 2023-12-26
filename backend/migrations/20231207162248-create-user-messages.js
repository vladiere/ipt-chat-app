'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_messages_table', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      uuid_to: {
        type: DataTypes.STRING,
        validate: {
          isNull: { msg: 'User to is required' },
        }
      },
      uuid_from: {
        type: DataTypes.STRING,
        validate: {
          isNull: { msg: 'User from is required' },
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isNull: { msg: 'Messages is required' }
        }
      },
      msg_status: {
        type: DataTypes.ENUM('read', 'unread'),
        defaultValue: 'unread',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('user_messages_table');
  }
};
