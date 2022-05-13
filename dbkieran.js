const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "dbkieran.sqlite",
});

module.exports = { sequelize, DataTypes, Model };