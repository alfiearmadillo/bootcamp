// ==UserScript==
// @name         Ulfyntown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Client for gather.town
// @author       Ulfyn
// @match        https://app.gather.town/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @grant        none
// ==/UserScript==

//For use with Tampermonkey

//  I
// JKL
//movement keys for teleport based movement (noclip)

//  T
//open teleport menu, select user to teleport to them

(function() {
    'use strict';
    
    let peopleString = "";
    let tpTarget = "";
    let peopleArray = [];
    Object.values(game.players).forEach(val => peopleArray.push(val));

    for(let i=0;i<peopleArray.length;i++){
        peopleString+=''+peopleArray[i].name+'|'
    }

    let userName = prompt("Username:", peopleString);
    let userIndex = peopleArray.findIndex(userName)

    document.addEventListener("keypress", function(i) {
        if (i.which == 105) {
            game.teleport(peopleArray[userIndex].map, peopleArray[userIndex].x, peopleArray[userIndex].y-1)
        }
        if (i.which == 106) {
            game.teleport(peopleArray[userIndex].map, peopleArray[userIndex].x-1, peopleArray[userIndex].y)
        }
        if (i.which == 107) {
            game.teleport(peopleArray[userIndex].map, peopleArray[userIndex].x, peopleArray[userIndex].y+1)
        }
        if (i.which == 108) {
            game.teleport(peopleArray[userIndex].map, peopleArray[userIndex].x+1, peopleArray[userIndex].y)
        }
        if (i.which == 116) {
            tpTarget = prompt('Teleport to:\n', peopleString);
            const isTarget = (element) => element.name == tpTarget;
            let targetIndex = peopleArray.findIndex(isTarget)
            game.teleport(peopleArray[targetIndex].map, peopleArray[targetIndex].x, peopleArray[targetIndex].y)
        }
    })
})();