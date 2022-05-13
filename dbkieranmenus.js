const { sequelize, DataTypes, Model } = require("../db");

class Menus extends Model {}

Menus.init(
{
    // Model attributes are defined here

    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},
{
    // Other model options go here
    sequelize, // We need to pass the connection instance
}
);

module.exports = Restaurant;