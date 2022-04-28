"use strict";

const is_number = require("is-number");
//const { beforeAll } = require("jest-circus");

class Bag{
    weight;
    bagID;
    constructor(weight){
        if (is_number(weight) && weight > 0) {
        this.weight=weight;
        } else {
            this.weight = NaN;
        }
        this.bagID=Math.floor(Math.random() * 10000000);
    }
    isOverLimit(){
        if(this.weight>=9 || isNaN(this.weight)){
            return this.bagID;
        } else {
            return -1;
        }
    }
}

class Passenger{
    name;
    passportNumber;
    seatNumber;
    bags;
    constructor(seatNumber, bags){
        let tempname = "";
        for(let i=0;i<Math.floor(Math.random() * 11)+3;i++){
            tempname = tempname + String.fromCharCode(Math.floor(Math.random() * 26)+97)
        }
        this.name=tempname;
        this.passportNumber=Math.floor(Math.random() * 10000000);
        this.seatNumber=seatNumber;
        
        this.bags=bags;
    }
    addBag(newBag){
        this.bags.push(newBag)
    }
    removeBag(bagLookingFor){
        const bagIsID=(element)=>element.bagID===(bagLookingFor);
        const bagIndex = this.bags.findIndex(bagIsID);
        if(bagIndex > -1){
        this.bags.splice(bagIndex,1);
        }
    }
}

class Plane{
    type;
    planeID;
    passengersOnPlane;
    static passengersOnAllPlanes = [];
    planeCapacity;
    constructor(type) {
        this.passengersOnPlane = []
        this.planeID=Math.floor(Math.random() * 10000000);
        switch(type) {
            case 0:
                this.type="Commercial  Jet"
                this.planeCapacity = 100;
                break;
            case 1:
                this.type="Private Jet"
                this.planeCapacity = 4;
                break;
            case 2:
                this.type="Humanitarian Aid Plane"
                this.planeCapacity = 10;
                break;
            case 3:
                this.type="Military Plane"
                this.planeCapacity = 20;
                break;
            default:
                this.type="The Topphat Airship"
                this.planeCapacity = 16;
                break;
        }
    }
    addPassenger(passengertobepushed){
        
        if (this.passengersOnPlane.length < this.planeCapacity || this.passengersOnPlane.length == undefined) {
            this.passengersOnPlane.push(passengertobepushed);
            Plane.passengersOnAllPlanes.push(passengertobepushed);
            
        }
    }
}

// class CrewMember{
//     name;
//     position;
//     staffNumber;
// }

class Runway{
    runwayID;
    planesOnThisRunway;
    static maxPlanesOnRunways = 15;
    static planesOnRunways = [];

    constructor(planesOnThisRunway){
        this.planesOnThisRunway=planesOnThisRunway
    this.runwayID=Math.floor(Math.random() * 10000000);
    }
    addPlane(newPlane){
        if (Runway.planesOnRunways.length < Runway.maxPlanesOnRunways) {
            this.planesOnThisRunway.push(newPlane)
            Runway.planesOnRunways.push(newPlane)
        }
    }
}

class Airport{
    name;
    runways;
    constructor(runways){
        let tempname = "";
        for(let i=0;i<Math.floor(Math.random() * 11)+3;i++){
            tempname = tempname + String.fromCharCode(Math.floor(Math.random() * 26)+97)
        }
        tempname = tempname + " Airport"
        this.name = tempname;
        this.runways = runways;
    }
    addRunway(newrunway){
        this.runways.push(newrunway)
    }
}


let airport = new Airport([])
for(let i=0;i<Math.floor(Math.random() * 4)+1;i++){
    airport.addRunway(new Runway([]))
}
//console.log(airport)


for(let i=0;i<airport.runways.length;i++){
    for(let l=0;l<Math.floor(Math.random() * 7)+1;l++){
        airport.runways[i].addPlane(new Plane(Math.floor(Math.random() * 5)), []);
        
    }
    //console.log(airport.runways[i])
}


for(let i=0;i<Runway.planesOnRunways.length;i++){
    for(let l=0;l<Math.floor(Math.random() * 100)+1;l++){
        Runway.planesOnRunways[i].addPassenger(new Passenger(l+1, []));
        
    }
    //console.log(Runway.planesOnRunways[i])
}

for(let i=0;i<Plane.passengersOnAllPlanes.length;i++){
    for(let l=0;l<Math.floor(Math.random() * 3)+1;l++){
        Plane.passengersOnAllPlanes[i].addBag(new Bag(Math.floor(Math.random() * 13)));
    }
}
console.log(Plane.passengersOnAllPlanes);
















// let testguy = new Passenger(1, []);
// testguy.addBag(new Bag(7));
// let testplane = new Plane
// testplane.addPassenger(testguy)
// console.log(testguy);
// console.log(testplane.bags)









// let runwayOne = new Runway([])
// let runwayTwo = new Runway([])
// let runwayThree = new Runway([])

// for(let i=0;i<7;i++){
//         runwayOne.addPlane(new Plane(Math.floor(Math.random() * 4)), []);
// }

// for(let i=0;i<7;i++){
//         runwayTwo.addPlane(new Plane(Math.floor(Math.random() * 4)), []);
// }

// for(let i=0;i<7;i++){
//         runwayThree.addPlane(new Plane(Math.floor(Math.random() * 4)), []);
// }

// //console.log(Runway.planesOnRunways);






// const passengerOne = new Passenger('Jimothy', 745, 1, []);


// for(let i=0;i<(Math.floor(Math.random() * 4))+1;i++){
// passengerOne.addBag(new Bag(Math.floor(Math.random() * 13)));
// }








// //console.log(passengerOne.bags);
 
// for(let i=0; i < passengerOne.bags.length; i++){
//     let returnedValue = passengerOne.bags[i].isOverLimit();
//     if (returnedValue >-1){
//         passengerOne.removeBag(returnedValue);
//         i--
//     }
// }

// //console.log(passengerOne.bags);

// // let tets = bag3.isntOverLimit()
// // if(tets===1){
// //     console.log('Bag is under max weight')
// // } else if(tets===0) {
// //     console.log('Bag is over max weight')
// // } else {
// //     console.log('Bag is what did you do?')
// // }



module.exports = {Bag, Passenger, Airport, Plane, Runway}