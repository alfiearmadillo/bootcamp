
//const { test } = require("picomatch")
const {Bag, Passenger, Airport, Plane, CrewMember} = require("./planes.js")

const bag = new Bag(new Bag(Math.floor(Math.random() * 13)))

const passenger = new Passenger('Name', 1, 1, [])






test("limit", () => {
    expect(bag.isOverLimit()).toBe(1)
})

test("addbag", () => {
    expect(passenger.addBag(10)).toBe()
})

test("removebag", () => {
    expect(passenger.removeBag(7634685)).toBe()
})