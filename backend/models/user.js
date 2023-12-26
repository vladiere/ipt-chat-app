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
    static associate({ UserMessages }) {
      // define association here
      this.hasMany(UserMessages, { foreignKey: 'uuid_from', as: 'sentMessages' });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }

    getUser() {
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
    user_status: {
      type: DataTypes.ENUM,
      values: ['online', 'offline'],
      defaultValue: 'offline'
    }
  }, {
    sequelize,
    tableName: 'users_table',
    modelName: 'User',
  });
  return User;
};
