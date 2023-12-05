'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init({
    refresh_token_id: {
      type: DataTypes.UUID
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING
      notNull: true
    },
    refresh_token: {
      type: DataTypes.STRING
      notNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE
    }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};
