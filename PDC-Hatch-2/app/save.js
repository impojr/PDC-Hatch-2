import * as fs from"fs";
import * as playerManager from"./user.js";
import {user} from"user-profile";

export function firstLoad(){
  console.log("first load of game");
  var saveData = playerManager.CreatePlayer(user.gender);
  saveState(saveData);
  return saveData;
};

export function saveState(data){
  let saveData = {"player":data};
  fs.writeFileSync("pdc-hatch-save.txt",saveData,"json");
};

export function loadState(){
  try{
    var save = fs.readFileSync("pdc-hatch-save.txt","json");
    if (save.player === undefined) {
      return firstLoad();
    } else {
      return save.player;
    }
  } catch(ex) {
    return firstLoad();
  }
};

export function formatDate(e){if(null!=e){var t=(e=new Date(e)).getDate(),r=e.getMonth()+1;return(t<10?"0":"")+t+"-"+(r<10?"0":"")+r+"-"+e.getFullYear()}return"00-00-0000"};