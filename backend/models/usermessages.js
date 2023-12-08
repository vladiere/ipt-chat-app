'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'messages' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, }
    }
    
  }
  UserMessages.init({
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Message is required' }
      }
    },
    msg_status: {
      type: DataTypes.ENUM('read', 'unread'),
      defaultValue: 'unread',
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'user_messages_table',
    modelName: 'UserMessages',
  });
  return UserMessages;
};
