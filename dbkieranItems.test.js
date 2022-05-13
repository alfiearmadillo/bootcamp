const { beforeAll, describe, test, expect } = require("@jest/globals");
const { sequelize } = require("./dbkieran");
const items = require("./dbkieranItems");

describe("Items", () => {
    beforeAll(async () => {
        await sequelize.sync({force:true});
    });

    test("Can create an item", async () => {
        const Menus = await items.create({
            title: "Jack O' Lantern",
        });

        expect(Items.id).toBe(1);
        expect(Items.title).toBe("Jack O' Lantern");

    })
});