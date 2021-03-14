import document from"document";
import * as saveManager from"./save.js";
import * as screenManager from"./screen.js";
import * as pokemonManager from"./pokemon.js";

export function loadPc(){
  //remember pokemon[0] is the partner pokemon and should not be displayed in the pc
  var pokemon = saveManager.loadState().pokemon;
  var pcSize = pokemon.length-1;
  var pcRows = Math.floor(pcSize / 3) + (pcSize % 3 == 0 ? 0 : 1);
  
  console.log("pcSize " + pcSize);
  console.log("pcRows " + pcRows);
  
  var viewHeight = 286;
  
  if (pcRows > 2) {
    viewHeight = 25 + 50 + 50 + (pcRows * (25 + 56));
  }
  
  var scrollView = document.getElementById("scrollview");
  scrollView.height = viewHeight;
  
  var emptyPcText = document.getElementById("pc-empty");
  emptyPcText.style.display = "none";
  
  if (pcSize == 0) {
    emptyPcText.style.display = "inline";
  } 
  
  var pcPokemon = document.getElementsByClassName("pc-image");
  pcPokemon.forEach((element, index) => {
    var pkmn = pokemon[index + 1];
    if (pkmn == undefined) {
      element.style.display = "none";
    } else {
      element.style.display = "inline";
      element.href = "images/icons/"+pokemonManager.getImg(pkmn)+".png";
    }
  });
};
