"use strict";
const { Model } = require("sequelize");
const role = require("./role");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permission.init(
    {
      title: { type: DataTypes.STRING, allowNull: false, unique: true },
      meta: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
    },

    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
