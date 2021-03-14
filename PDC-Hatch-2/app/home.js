import document from "document";
import * as saveManager from "./save.js";
import * as pokemonManager from "./pokemon.js";
import * as screenManager from "./screen.js";
import * as messaging from "messaging";
import * as userManager from "./user.js";
import * as stepManager from "./steps.js";

export function refreshData(){
  var save = saveManager.loadState();
  var goalPercentText = document.getElementById("h-goal-percent");
  var goalText = document.getElementById("h-goal-percent-text");
  var goalWidth = stepManager.getDailyGoalWidth();
  var goalPercent = stepManager.getDailyPercent();
  goalText.text = goalPercent + "%";
  goalPercentText.width = goalWidth;
  
  if (!save.noMoreEggs && stepManager.getGoalPercentageMet() >= 1) {
    if (save.lastGoalReachedDate == null || saveManager.formatDate(save.lastGoalReachedDate) != saveManager.formatDate(new Date())) {
      screenManager.showGoalMet();
    }
  }
};

export function loadHome(){
  var save = saveManager.loadState();
  var pkmn = save.pokemon[0];
  var playerName = document.getElementById("h-player-name");
  var playerImage = document.getElementById("h-player-image");
  var pokemonName = document.getElementById("h-pokemon-name");
  var pokemonImage = document.getElementById("h-pokemon-image");

  document.getElementById("h-dex").style.display = save.availableEggs.length == 0 ? "inline" : "none";
  
  playerName.text = save.name;
  playerImage.href = "images/" + save.name + ".png";
  pokemonName.text = pokemonManager.getName(pkmn);
  pokemonImage.href ="images/sprites/" + pokemonManager.getImg(pkmn) + ".png";
  refreshData();
};