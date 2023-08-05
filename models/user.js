"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // define association here
      User.belongsTo(models.Role);
      models.Role.hasMany(User);
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dateOfBirth: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      isEmailVerify: { type: DataTypes.BOOLEAN, defaultValue: false },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      imageUrl: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
