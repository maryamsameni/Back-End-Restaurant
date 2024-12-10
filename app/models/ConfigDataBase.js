const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Restaurant", "root", "newpassword", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
