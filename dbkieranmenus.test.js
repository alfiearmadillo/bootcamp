const { beforeAll, describe, test, expect } = require("@jest/globals");
const { sequelize } = require("./dbkieran");
const menus = require("./dbkieranmenus");

describe("Menus", () => {
    beforeAll(async () => {
        await sequelize.sync({force:true});
    });

    test("Can create a menu", async () => {
        const Menus = await menus.create({
            title: "Lunch Menu",
        });

        expect(Menus.id).toBe(1);
        expect(Menus.title).toBe("Lunch Menu");

    })
});