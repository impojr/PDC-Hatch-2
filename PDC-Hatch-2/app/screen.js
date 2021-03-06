import document from"document";
import * as goalMetManager from"./goalmet.js";
import * as homeManager from"./home.js";
import * as menuManager from"./menu.js";
import * as pokeScrManager from"./pokemon-screen.js";
import * as errorManager from"./error.js";
import * as pcManager from"./pc.js";

function hideScreens(){
  document.getElementsByClassName("holder").forEach(function(e){e.style.display="none"});
}

export function showErrorScreen(e){
  hideScreens();
  document.getElementById("Error").style.display="inline";
  errorManager.loadError(e)
};


export function showHome(){
  hideScreens();
  document.getElementById("Home").style.display="inline";
  homeManager.loadHome();
};

export function showPokemon(arrayIndex){
  hideScreens();
  document.getElementById("Pokemon").style.display="inline";
  pokeScrManager.loadPokemon(arrayIndex);
};

export function showMenu() {
  hideScreens();
  document.getElementById("Menu").style.display="inline";
}

export function showPc() {
  hideScreens();
  document.getElementById("Pc").style.display="inline";
  pcManager.loadPc();
}

export function showGoalMet() {
  hideScreens();
  document.getElementById("GoalMet").style.display="inline";
  goalMetManager.loadGoalMet();
}