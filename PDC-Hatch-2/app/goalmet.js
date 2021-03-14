import document from"document";
import * as saveManager from"./save.js";
import * as screenManager from"./screen.js";
import * as pokemonManager from"./pokemon.js";

export function loadGoalMet(){
  var save = saveManager.loadState();
  var playerImage = document.getElementById("g-player-image");
  playerImage.href = "images/" + save.name + ".png";
  
  save.lastGoalReachedDate = new Date();
  
  var pkmn = save.availableEggs[Math.floor(Math.random() * save.availableEggs.length)];
  var arrayIndex = save.availableEggs.indexOf(pkmn);
  var egg = pokemonManager.getNewPokemon(save.availableEggs.splice(arrayIndex, 1));

  save.pokemon.push(egg);
  
  if (save.availableEggs.length === 0) {
    if (!save.receivedHappiny) {
      save.availableEggs.push(24);
      save.receivedHappiny = true;
    } else {
      save.noMoreEggs = true;
    }
  }
  
  saveManager.saveState(save);
  
  var gMakePartnerbutton = document.getElementById("g-make-partner-button");
    gMakePartnerbutton.onclick = function() {
      save.pokemon.unshift(save.pokemon.pop());
      saveManager.saveState(save);
      screenManager.showPokemon(0);
  }
};
