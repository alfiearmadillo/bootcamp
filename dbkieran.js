
const {Sequelize, Datatypes, Model}=require("sequelize)");

const Sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
});

module.exports={Sequelize, Datatypes, Model};