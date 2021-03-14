/*
 * Entry point for the watch app
 */
import document from "document";
import * as screenManager from"./screen.js";
import * as homeManager from"./home.js";
import * as pokemonManager from"./pokemon.js";
import * as pokeScrManager from"./pokemon-screen.js";
import * as messaging from"messaging";

//add event listeners here so they don't duplicate on load

var hMenu = document.getElementById("h-menu");
var hPartner = document.getElementById("h-pokemon-image");

hMenu.addEventListener("click", (evt) => {
  screenManager.showMenu();
});

hPartner.addEventListener("click", (evt) => {
  screenManager.showPokemon(0);
});

var erHomeButton = document.getElementById("er-home-button");
erHomeButton.addEventListener("click", (evt) => {
  screenManager.showHome();
});

var pMenuButton = document.getElementById("p-menu-button");
var pWalkbutton = document.getElementById("p-walk-button");
var pMakePartnerbutton = document.getElementById("p-make-partner-button");

pMenuButton.addEventListener("click", (evt) => {
  screenManager.showMenu();
});

pWalkbutton.addEventListener("click", (evt) => {
  pokeScrManager.sync();
  //messaging.peerSocket.send(new Date());
  //pokemonManager.walk(100000);
  //screenManager.showPokemon(0);
});

//pmakepartner button is in the pokemon-screen script

var gHomeButton = document.getElementById("g-home-button");

gHomeButton.addEventListener("click", (evt) => {
  screenManager.showHome();
});

let menuHome = document.getElementById("menuHome");
let menuPartner = document.getElementById("menuPartner");
let menuPc = document.getElementById("menuPc");

menuHome.getElementById("touch").addEventListener("click", (evt) => {
    screenManager.showHome();
  });

menuPartner.getElementById("touch").addEventListener("click", (evt) => {
    screenManager.showPokemon(0);
  });

menuPc.getElementById("touch").addEventListener("click", (evt) => {
    screenManager.showPc();
  });

let pcMenuButton = document.getElementById("pc-menu-button");

pcMenuButton.addEventListener("click", (evt) => {
  screenManager.showMenu();
});

var pcPokemon = document.getElementsByClassName("pc-image");
pcPokemon.forEach((element, index) => {
  element.addEventListener("click", (evt) => {
    screenManager.showPokemon(index+1);
  });
});

setInterval(() => {
  homeManager.refreshData(); 
}, 1000 * 60);

messaging.peerSocket.onmessage=(e=>{"Error"==e.data.SyncDate?screenManager.showErrorScreen(0):0==e.data.Steps&&0==e.data.Friendship?screenManager.showErrorScreen(1):(console.log("new Sync Date "+e.data.SyncDate),console.log("new Sync Time "+e.data.SyncTime),console.log("new Steps "+e.data.Steps+" "+typeof e.data.Steps),pokemonManager.walk(e.data),screenManager.showPokemon(0))});

screenManager.showHome();
