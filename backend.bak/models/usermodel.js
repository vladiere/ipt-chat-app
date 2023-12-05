'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserModel.init({
    user_id: {
      type: DataTypes.UUID
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      notNull: true
    },
    lastname: {
      type: DataTypes.STRING
      notNull: true
    },
    username: {
      type: DataTypes.STRING
      notNull: true
    },
    password: {
      type: DataTypes.STRING
      notNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.STRING
      defaultValue: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'UserModel',
  });
  return UserModel;
};
