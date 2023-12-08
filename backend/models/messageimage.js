'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'msg_image' })
    }
  }
  MessageImage.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    uuid_to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User to is required' }
      },
    },
    uuid_from:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User to is required' }
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image file is required' }
      }
    },
    msg_status: {
      type: DataTypes.ENUM('read', 'unread'),
      defaultValue: 'unread',
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'message_image_table',
    modelName: 'MessageImage',
  });
  return MessageImage;
};
