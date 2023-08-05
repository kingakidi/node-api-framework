require("dotenv").config();
const fs = require("fs");

module.exports = {
  development: {
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: true,
  },
  test: {
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: true,
  },
  production: {
    username: "",
    password: "",
    database: "",
    host: "",
    port: "",
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {},
    },
  },
};
