const { sequelize, DataTypes, Model } = require("./dbkieran");

class Items extends Model {}

Items.init(
{
    // Model attributes are defined here

    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    // Other model options go here
    sequelize, // We need to pass the connection instance
}
);

module.exports = Items;