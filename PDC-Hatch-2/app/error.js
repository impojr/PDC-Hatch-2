import document from"document";
import*as screenManager from"./screen.js";

export function loadError(e){
  var n=document.getElementById("er-text");
  0==e?n.text="Please reconnect to the companion via the fitbit app.":1==e&&(n.text="You have not walked any steps since your last sync.");
};