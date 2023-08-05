"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize, DataTypes) {
    await queryInterface.createTable("Users", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
      },

      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
        allowNull: false,
      },

      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      isEmailVerify: { type: Sequelize.BOOLEAN, defaultValue: false },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      imageUrl: Sequelize.STRING,

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    await queryInterface.addConstraint("Users", {
      fields: ["roleId"],
      type: "foreign key",
      name: "role_user_constraint",
      references: {
        table: "Roles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
