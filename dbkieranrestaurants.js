const { sequelize, DataTypes, Model } = require("./dbkieran");

const Menus = require("./Menus");

class Restaurants extends Model {}

Restaurants.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
  }
);

Restaurants.hasMany(Menus, {as: "menus", foreignKey: "restaurants_id"});

module.exports = Restaurants;