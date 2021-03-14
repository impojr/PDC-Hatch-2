import * as saveManager from"./save.js";
import * as pokemonManager from"./pokemon.js";
import * as screenManager from"./screen.js";
import * as messaging from"messaging";
import document from"document";

export function loadPokemon(arrayIndex) {
  var save = saveManager.loadState();
  var pkmn = save.pokemon[arrayIndex];
  var icon = document.getElementById("p-pokemon-icon");
  var sprite = document.getElementById("p-pokemon-sprite");
  var name = document.getElementById("p-pokemon-name");
  var level = document.getElementById("p-pokemon-level");
  var obtained = document.getElementById("p-pokemon-obtained");
  var hatchedText = document.getElementById("p-hatch-marquee");
  var steps = document.getElementById("p-pokemon-steps");
  var expPercent = document.getElementById("p-exp-percent");
  var walkbutton = document.getElementById("p-walk-button");
  var makePartnerbutton = document.getElementById("p-make-partner-button");
  var menuButton = document.getElementById("p-menu-button");
  var partnerIcon = document.getElementById("p-pokemon-partner")
  
  walkbutton.style.display = "none";
  makePartnerbutton.style.display = "none";
  menuButton.style.display = "inline";
  partnerIcon.style.display = "none";
  
  if (arrayIndex == 0) { //if pokemon is partner
    walkbutton.style.display = "inline";
    partnerIcon.style.display = "inline";
  } else {
    makePartnerbutton.style.display = "inline";
    makePartnerbutton.onclick = function() {
      save.pokemon.unshift(save.pokemon.splice(arrayIndex,1)[0]);
      saveManager.saveState(save);
      screenManager.showPokemon(0);
    }
  }
  
  name.text=pokemonManager.getName(pkmn);
  icon.href="images/icons/"+pokemonManager.getImg(pkmn)+".png";
  sprite.href="images/sprites/"+pokemonManager.getImg(pkmn)+".png";
  expPercent.width=225*pokemonManager.getNxtLvlPercent(pkmn);
  level.text=pokemonManager.getLevel(pkmn);
  steps.text=pkmn.steps+" steps walked";
  obtained.text = "attained: " + pkmn.dateRecieved;
  hatchedText.state = "disabled";
  
  if (pokemonManager.isEgg(pkmn)) {
    if (pkmn.steps < 5000) {
      hatchedText.text = "It's not hatching anytime soon...";
    } else if (pkmn.steps < 8000) {
      hatchedText.text = "It will hatch eventually...";
    } else {
      hatchedText.text = "It's gonna hatch soon!";
    }
    
    setTimeout(() => {
      hatchedText.state = "enabled";
    }, 2000);
  } else {
    hatchedText.text = "hatched: "+ pkmn.dateHatched;
  }
};

export function sync() {
  var save = saveManager.loadState();
  var menuButton = document.getElementById("p-menu-button");
  var walkbutton = document.getElementById("p-walk-button");
  var steps = document.getElementById("p-pokemon-steps");
  
  steps.text = "syncing...";
  walkbutton.style.display = "none";
  menuButton.style.display = "none";
  
  console.log("save.lastSyncDate.SyncDate " + save.lastSyncDate.SyncDate);
  console.log("save.lastSyncDate.SyncTime " + save.lastSyncDate.SyncTime);
  
  messaging.peerSocket.send(save.lastSyncDate);
}