'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class shopping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shopping.init({
    Name: DataTypes.STRING,
    Createdate:DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'shopping',
  });
  return shopping;
};