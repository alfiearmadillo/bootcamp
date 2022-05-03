const {City, ChargingStation, User, Scooter} = require("./Scooters.js")

City.addChargingStation(new ChargingStation("test6scooters"));
for(i=0;i!==7;i++){
    City.chargingStations[0].newScooter(100);
};

test("new user", () => {
    expect(testUser = new User("User1", 24, 9429043587539, 100)).toEqual({"additionalDays": 0, "balance": 100, "scooterInfo": undefined, "scootersRented": 0, "userAge": 24, "userName": "User1", "userPaymentDetails": 9429043587539});
})

test("new user, under 18", () => {
    expect(testUser2 = new User("User2", 16, 9429043587539, 100)).toEqual({"additionalDays": 0, "balance": 100, "scooterInfo": undefined, "scootersRented": 0, "userAge": 16, "userName": "User2", "userPaymentDetails": 9429043587539});
})

test("new user, name not string", () => {
    expect(testUser3 = new User(100, 24, 9429043587539, 100)).toEqual({"additionalDays": 0, "balance": 100, "scooterInfo": undefined, "scootersRented": 0, "userAge": 24, "userName": 100, "userPaymentDetails": 9429043587539});
})

test("use scooter without having one", () => {
    expect(testUser.useScooter(10,10)).toBe("Cannot log time/distance, you don't have a scooter currently rented.");
})

test("return scooter to without having one", () => {
    expect(testUser.returnScooter(0)).toBe("Error, no scooter is registered as hired by you to return.");
})

test("new charging station in city test", () => {
    expect(City.addChargingStation(new ChargingStation("testLocation"))).toBe("testLocation");
})

test("new charging station in city test", () => {
    expect(City.addChargingStation(new ChargingStation("testLocation2"))).toBe("testLocation2");
})

test("new charging station in city test, number for name", () => {
    expect(City.addChargingStation(new ChargingStation(1))).toBe(1);
})

test("new charging station in city test, bool for name", () => {
    expect(City.addChargingStation(new ChargingStation(true))).toBe(true);
})

test("New scooter in existing station", () => {
    expect(City.chargingStations[1].newScooter(100)).toEqual({"charge": 100, "distanceTravelled": 0, "scooterTimeTillCharged": 0, "timeSinceDocked": 0});
})

test("New scooter in different existing station", () => {
    expect(City.chargingStations[2].newScooter(45)).toEqual({"charge": 45, "distanceTravelled": 0, "scooterTimeTillCharged": 1.1, "timeSinceDocked": 0});
})

test("new scooter in existing station - invalid charge (too high)", () => {
    expect(City.chargingStations[2].newScooter(372)).toBe("Invalid charge");
})

test("new scooter in existing station - invalid charge (too low)", () => {
    expect(City.chargingStations[2].newScooter(-372)).toBe("Invalid charge");
})

test("withdraw scooter from location with no charged scooters available", () => {
    expect(testUser.withdrawScooter(2)).toBe("Sorry, this station has no fully charged scooters.");
})

test("withdraw scooter from location with charged scooter", () => {
    expect(testUser.withdrawScooter(1)).toEqual({"charge": 100, "distanceTravelled": 0, "scooterTimeTillCharged": 0, "timeSinceDocked": 0});
})

test("withdraw 2nd scooter", () => {
    expect(testUser.withdrawScooter(2)).toBe("You already have a scooter hired, please return the previous scooter before hiring another.");
})

test("use scooter for invalid time", () => {
    expect(testUser.useScooter(-10,10)).toBe("Error, invalid value");
})

test("use scooter for invalid dist", () => {
    expect(testUser.useScooter(10,-10)).toBe("You cannot travel negative distance, try again.");
})

test("use scooter for invalid time type", () => {
    expect(testUser.useScooter("test",10)).toBe("Error, invalid value");
})

test("use scooter for invalid dist type", () => {
    expect(testUser.useScooter(10,"test")).toBe("Error, invalid value");
})

test("use scooter 10h 10km", () => {
    expect(testUser.useScooter(10,10)).toEqual({"charge": 68.75, "distanceTravelled": 10, "scooterTimeTillCharged": 0, "timeSinceDocked": 10});
})

test("use scooter an additional 10h 10km", () => {
    expect(testUser.useScooter(10,10)).toEqual({"charge": 37.5, "distanceTravelled": 20, "scooterTimeTillCharged": 0, "timeSinceDocked": 20});
})

test("use scooter more than remaining charge would allow (20h 20km)", () => {
    expect(testUser.useScooter(20,20)).toBe("The maximum range of the scooter on a full charge is 32km, please enter a lower distance.");
})

test("use scooter for >72h", () => {
    expect(testUser.useScooter(60,0)).toEqual({"charge": 37.5, "distanceTravelled": 20, "scooterTimeTillCharged": 0, "timeSinceDocked": 80-24});
})

test("return scooter to full rack", () => {
    expect(testUser.returnScooter(0)).toBe("Error, this location is currently full, please return to another location");
})

test("return scooter to full rack", () => {
    expect(testUser.returnScooter(0)).toBe("Error, this location is currently full, please return to another location");
})

test("return scooter to non existant", () => {
    expect(testUser.returnScooter(45435)).toBe("Please return the scooter to a valid location");
})

test("return scooter to valid rack", () => {
    expect(testUser.returnScooter(1)).toBe(null);
})



// test("new scooter in non existant location (too low)", () => {
//     expect(City.chargingStations[-1].newScooter(50)).toBe();
// })

// test("new scooter in non existant location (too high)", () => {
//     expect(City.chargingStations[766776].newScooter(50)).toBe();
// })