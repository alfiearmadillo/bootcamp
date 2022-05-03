"use strict";

const is_number = require("is-number");

class Scooter{
    distanceTravelled; //max 32km
    timeSinceDocked;
    scooterTimeTillCharged; //2h from empty
    charge;

    constructor(charge){
        this.distanceTravelled = 0;
        this.timeSinceDocked = 0;
        this.scooterTimeTillCharged = 2-(2*(charge/100));
        this.charge = charge;
    }

}

class User{
    userName; //required for app, useless data
    userAge; //app requires over 18
    userPaymentDetails;
    scooterInfo;
    additionalDays;
    balance;
    scootersRented = 0;
    
    constructor(userName,userAge,userPaymentDetails,balance){
        this.userName = userName;
        this.userAge = userAge;
        this.userPaymentDetails = userPaymentDetails;
        this.balance = balance;
        this.additionalDays = 0;
        this.scootersRented = 0;
    }

    withdrawScooter(location){;
        let tempScooterChargedFinder;
        if((City.chargingStations.length)>location && location>(-1)){
        tempScooterChargedFinder = City.chargingStations[location].scootersDocked.findIndex(element => element.charge==100);

            if(this.userAge<18){
                console.log("You are not above the minimum permitted age to hire a scooter, sorry.");
                return "You are not above the minimum permitted age to hire a scooter, sorry.";
            } else if(this.scootersRented!==0){
                console.log("You already have a scooter hired, please return the previous scooter before hiring another.");
                return "You already have a scooter hired, please return the previous scooter before hiring another.";
            }else{
                if(tempScooterChargedFinder>-1){
                    console.log("Rented a scooter from",City.chargingStations[location].chargingStationLocation,".");
                    this.scooterInfo = City.chargingStations[location].scootersDocked[tempScooterChargedFinder];
                    City.chargingStations[location].scootersDocked.splice(tempScooterChargedFinder,1);
                    this.scootersRented++;
                    return this.scooterInfo;
                } else {
                    console.log("Sorry, this station has no fully charged scooters.");
                    return "Sorry, this station has no fully charged scooters.";
                }
            }
        } else {
            console.log("This location does not exist.");
            return "This location does not exist.";
        }
    }

    returnScooter(location){
        if((City.chargingStations.length)>location && location>(-1)){
            if(this.scootersRented==0){
                console.log("Error, no scooter is registered as hired by you to return.");
                return "Error, no scooter is registered as hired by you to return.";
            }else if(City.chargingStations[location].scootersDocked.length==6){
                console.log("Error, this location is currently full, please return to another location");
                return "Error, this location is currently full, please return to another location";
            }else{
                console.log("Returned a scooter to",City.chargingStations[location].chargingStationLocation,".");
                console.log("You have been charged £",15-(0.1*(this.scooterInfo.charge)),"for using",100-this.scooterInfo.charge,"% of the scooter's battery life.");
                this.balance = this.balance-(0.1*(this.scooterInfo.charge));
                this.scootersRented--;
                City.chargingStations[location].scootersDocked.push(this.scooterInfo);
                this.scooterInfo = null;
                return this.scooterInfo;
            }
        }else{
            console.log("Please return the scooter to a valid location")
            return "Please return the scooter to a valid location";
        }
    }

    useScooter(time, distance){
        if(this.scootersRented!==0){
            if (distance + this.scooterInfo.distanceTravelled > 32) {
                console.log("The maximum range of the scooter on a full charge is 32km, please enter a lower distance.");
                return "The maximum range of the scooter on a full charge is 32km, please enter a lower distance.";
            } else if (distance < 0) {
                console.log("You cannot travel negative distance, try again.");
                return "You cannot travel negative distance, try again.";
            } else if (is_number(distance) && time >= 0) {
                this.scooterInfo.distanceTravelled = this.scooterInfo.distanceTravelled + distance;
                this.scooterInfo.timeSinceDocked = this.scooterInfo.timeSinceDocked + time;
                this.scooterInfo.charge = 100 * (1 - (this.scooterInfo.distanceTravelled / 32));
                console.log("",time,"h", distance,"km logged");
            } else {
                console.log("Error, invalid value");
                return "Error, invalid value";
            }

            if (this.scooterInfo.timeSinceDocked >= 72 && time >= 0) {
                while (this.scooterInfo.timeSinceDocked >= 72) {
                    console.log("You have been charged £5 for an additional day of service.");
                    this.scooterInfo.timeSinceDocked = this.scooterInfo.timeSinceDocked - 24;
                    this.balance = this.balance - 5;
                }
            }
            if (this.scooterInfo.timeSinceDocked < 72 && time >= 0) {
                console.log("Please return the scooter within 3 days of hiring it. For every additional day past 3, you will be automatically charged a fee of £5");
                console.log("Time Remaining:", 72 - this.scooterInfo.timeSinceDocked, "hours.");
            }
            return this.scooterInfo;

    }else{
        console.log("Cannot log time/distance, you don't have a scooter currently rented.");
        return "Cannot log time/distance, you don't have a scooter currently rented.";
    }
    }
}

class ChargingStation{
    scootersDocked = []; //max 6
    chargingStationLocation;

    constructor(chargingStationLocation){
        this.chargingStationLocation = chargingStationLocation;
    }

    newScooter(scooterChaarge){
        if (100>=scooterChaarge && scooterChaarge>=0){
        if(this.scootersDocked.length<6){
            var tempScooterStorage = new Scooter(scooterChaarge)
            this.scootersDocked.push(tempScooterStorage);
            return tempScooterStorage;
        } else{
            console.log("Scooter rack is full, couldnt create scooter");
            return "Scooter rack is full, couldnt create scooter";
             
        }
    }else{
        console.log("Invalid charge");
        return "Invalid charge";
    }
    }

}

class City{
    cityName;
    static chargingStations = [];
    
    constructor(cityName){
        this.cityName = cityName;
    }

    static addChargingStation(chargingStationFull){
        this.chargingStations.push(chargingStationFull);
        console.log("Created charging station at",City.chargingStations[(City.chargingStations.length)-1].chargingStationLocation);
        return(City.chargingStations[(City.chargingStations.length)-1].chargingStationLocation);
       
    }

}

// let testUser = new User("User1", 24, 9429043587539, 100)
// let testUser2 = new User("User2", 11, 8248753946574, 14)

// City.addChargingStation(new ChargingStation("1 Charged scooter location test")); //0
// City.addChargingStation(new ChargingStation("0 Charged scooter location test")); //1
// City.addChargingStation(new ChargingStation("2+ Charged scooter location test")); //2
// City.addChargingStation(new ChargingStation("Full (/over full) scooter location test")); //3

// City.chargingStations[0].newScooter(100);
// City.chargingStations[0].newScooter(70);

// City.chargingStations[1].newScooter(0);
// City.chargingStations[1].newScooter(23);
// City.chargingStations[1].newScooter(37);

// City.chargingStations[2].newScooter(100);
// City.chargingStations[2].newScooter(100);
// City.chargingStations[2].newScooter(100);
// City.chargingStations[2].newScooter(33);

// City.chargingStations[3].newScooter(53);
// City.chargingStations[3].newScooter(54);
// City.chargingStations[3].newScooter(55);
// City.chargingStations[3].newScooter(56);
// City.chargingStations[3].newScooter(57);
// City.chargingStations[3].newScooter(100);
// City.chargingStations[3].newScooter(2);
// City.chargingStations[3].newScooter(5);

// testUser.withdrawScooter(3); // ✓

// testUser.useScooter(100,2); // ✓

// testUser.returnScooter(3);




//console.log(City.chargingStations[0]);


module.exports = {City, ChargingStation, User, Scooter};