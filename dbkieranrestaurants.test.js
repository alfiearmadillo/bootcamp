const { beforeAll, describe, test, expect } = require("@jest/globals");
const { sequelize } = require("./dbkieran");
const Restaurant = require(".dbkieranrestaurant");

describe("Restaurant", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Can create a restaurant", async () => {
    const restaurant = await Restaurant.create({
      name: "Nando's",
      imageURL:
        "https://wembleypark.com/media/images/Nandos_Platter_in_London_Designer_.2e16d0ba.fill-496x279.png",
    });

    expect(restaurant.id).toBe(1);
    expect(restaurant.name).toBe("Nando's");
    expect(restaurant.imageURL).toBe(
      "https://wembleypark.com/media/images/Nandos_Platter_in_London_Designer_.2e16d0ba.fill-496x279.png"
    );
  });
});