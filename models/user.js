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
    static associate(models) {
      models.User.hasMany(models.Post, { foreignKey: 'iduser' , as:'post' });
    }
  };
  User.init({
    username: {
      type:DataTypes.STRING,
      primaryKey: true
    },
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    avt: DataTypes.STRING,
    password: DataTypes.STRING,
    permistion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};