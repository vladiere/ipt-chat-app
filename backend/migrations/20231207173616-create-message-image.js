'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('message_images_table', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      uuid_to: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: { msg: 'User to is required' },
        }
      },
      uuid_from: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: { msg: 'User from is required' },
        }
      },
      image: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
        validate: {
          isNull: { msg: 'Image file is required' }
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
    await queryInterface.dropTable('message_images_table');
  }
};
