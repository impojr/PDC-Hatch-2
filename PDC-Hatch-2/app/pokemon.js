import * as fs from"fs";
import * as saveManager from"./save.js";

export class Pokemon{
  constructor(id){
    var pkmnData = fs.readFileSync("/mnt/assets/resources/pokemon.json","json")[id-1];
    this.id = pkmnData.id;
    this.name = pkmnData.name;
    this.exp = 0;
    this.dateHatched = null;
    this.dateRecieved = saveManager.formatDate(new Date());
    this.isGmax = false;
    this.data = pkmnData;
    this.steps = 0;
  }
};

export function getNewPokemon(id){
  return new Pokemon(id);
};

function getLevelDouble(pkmn) {
  var exp = Math.pow(pkmn.exp, 1.0 / 3);
  return exp;
}

export function getLevelInt(pkmn){
  return Math.floor(getLevelDouble(pkmn));
};

export function getNxtLvlPercent(pkmn){
  var lvlDouble = getLevelDouble(pkmn);
  return lvlDouble >= 100 ? 1 : lvlDouble < 1 ? pkmn.steps / 10000 : lvlDouble - Math.floor(lvlDouble);
};

export function getLevel(pkmn){
  var t=getLevelInt(pkmn);
  return t >= 100 ? "MAX" : 0 == t ? pkmn.steps >= 10000 ? "L01" : "EGG" : t < 10 ? "L0"+t:"L"+t;
};

export function walk(data){
  console.log("data " + data);
  console.log("data.Steps " + data.Steps);
  console.log("data.SyncDate " + data.SyncDate);
  console.log("data.SyncTime " + data.SyncTime);
  
  var state = saveManager.loadState();
  var pkmn = state.pokemon[0];
  var isPkmnEgg = isEgg(pkmn);
  
  pkmn.steps += data.Steps;
  
  if (isPkmnEgg) {
    if (pkmn.steps >= 10000) {
      pkmn.dateHatched = saveManager.formatDate(new Date());
      var overstep = pkmn.steps - 10000;
      pkmn.exp += overstep;
    }
  } else {
    pkmn.exp += data.Steps;
    
    if (pkmn.data.evolves != undefined && pkmn.data.evolves <= getLevelInt(pkmn)) {
      var evolution = new Pokemon(pkmn.data.into);
      pkmn.id = evolution.id;
      pkmn.name = evolution.name;
      pkmn.data = evolution.data;
    } else if (pkmn.data.gmax && !pkmn.isGmax && pkmn.steps > 500000) {
      pkmn.isGmax = true;
    }
  }

  state.lastSyncDate = {SyncDate:data.SyncDate, SyncTime:data.SyncTime}
  saveManager.saveState(state);
};

export function getImg(pkmn){
  if (pkmn.isGmax) {
    return pkmn.id+"g";
  } else {
    return isEgg(pkmn) ? "0" : pkmn.id;
  }
};

export function getName(e){
  return isEgg(e)?"Egg":e.name
};

export function isEgg(pokemon){
  return pokemon.steps < 10000;
};
