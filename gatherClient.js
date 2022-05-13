// ==UserScript==
// @name         Ulfyntown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Client for gather.town
// @author       Ulfyn ft. Richard
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

// P
//spawn go-kart

(function() {
    'use strict';

    document.addEventListener("keypress", function(i) {
        if (i.which == 105) {
            game.teleport(game.getMyPlayer().map, game.getMyPlayer().x, game.getMyPlayer().y-1)
        }
        if (i.which == 106) {
            game.teleport(game.getMyPlayer().map, game.getMyPlayer().x-1, game.getMyPlayer().y)
        }
        if (i.which == 107) {
            game.teleport(game.getMyPlayer().map, game.getMyPlayer().x, game.getMyPlayer().y+1)
        }
        if (i.which == 108) {
            game.teleport(game.getMyPlayer().map, game.getMyPlayer().x+1, game.getMyPlayer().y)
        }
        if (i.which == 112) {
            game.setVehicleId('go-kart')
        }
        if (i.which == 116) {
            let peopleString = "";
            let tpTarget = "";
            let peopleArray = [];
            Object.values(game.players).forEach(val => peopleArray.push(val));

            for(let i=0;i<peopleArray.length;i++){
                peopleString+=''+peopleArray[i].name+'|'
            }
            tpTarget = prompt('Teleport to:\n', peopleString);
            const isTarget = (element) => element.name == tpTarget;
            let targetIndex = peopleArray.findIndex(isTarget)
            game.teleport(peopleArray[targetIndex].map, peopleArray[targetIndex].x, peopleArray[targetIndex].y)
            peopleArray=[];
            targetIndex = null;
            


        }
    })
})();