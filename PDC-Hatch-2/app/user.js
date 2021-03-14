import * as fs from"fs";
import * as pokemonManager from"./pokemon.js";
import * as saveManager from"./save.js";

export function CreatePlayer(gender){
  var player = new Object;
  
  if (gender == "male") {
    player.pokemon = [ pokemonManager.getNewPokemon(29) ];
    player.availableEggs = [1,4,7,10,13,15,16,19,22,27,28,31,33,35,38,41,44,47,50,52,55,57,59,61,63,66,69,71,73];
    player.name = "Nate";
  } else {
    player.pokemon = [ pokemonManager.getNewPokemon(13) ];
    player.availableEggs = [1,4,7,10,15,16,19,22,27,28,29,31,33,35,38,41,44,47,50,52,55,57,59,61,63,66,69,71,73];
    player.name = "Rosa";
  }
  
  player.noMoreEggs = false;
  player.receivedHappiny = false;
  player.lastGoalReachedDate = null;
  player.lastSyncDate = {SyncDate:formatSyncDate(new Date), SyncTime:"00:00:00"};
  
  return player;
}

export function LoadPlayer(){
  return saveManager.loadState()
}

export function formatSyncDate(e){if(null!=e){var a=(e=new Date(e)).getDate(),t=e.getMonth()+1;return e.getFullYear()+"-"+(t<10?"0":"")+t+"-"+(a<10?"0":"")+a}return"00-00-0000"}
