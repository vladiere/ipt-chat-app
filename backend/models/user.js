'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserMessages, MessageImage }) {
      // define association here
      this.hasMany(UserMessages, { foreignKey: 'user_id', as: 'user' });
      this.hasMany(MessageImage, { foreignKey: 'user_id', as: 'user_img' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined }
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Firstname is required' }
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Lastname is required' }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Invalid email address' },
        notNull: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
        notNull: { msg: 'Password is require' }
      }
    },
  }, {
    sequelize,
    tableName: 'users_table',
    modelName: 'User',
  });
  return User;
};
