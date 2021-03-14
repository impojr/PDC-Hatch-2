import*as messaging from"messaging";import{settingsStorage}from"settings";function fetchActivityData(t,e){var n=e.SyncDate,r=e.SyncTime,i=new Date(n);let s=formatSyncDate(new Date),a=formatSyncTime(new Date);var o=0,c=0;if(n!=s){fetch(`https://api.fitbit.com/1.2/user/-/activities/steps/date/${n}/${n}/1min/time/${r}/23:59:00.json`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(function(t){return t.json()}).then(function(t){o+=parseInt(t["activities-steps"][0].value)}).catch(function(t){returnError()}),fetch(`https://api.fitbit.com/1.2/user/-/activities/calories/date/${n}/${n}/1min/time/${r}/23:59:00.json`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(function(t){return t.json()}).then(function(t){c+=parseInt(t["activities-calories"][0].value)}).catch(function(t){returnError()});var u=formatSyncDate(i.setDate(i.getDate()+1));fetch(`https://api.fitbit.com/1.2/user/-/activities/steps/date/${u}/${s}.json`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(function(t){return t.json()}).then(function(t){t["activities-steps"].forEach(function(t){o+=parseInt(t.value)})}).catch(function(t){returnError()}),fetch(`https://api.fitbit.com/1.2/user/-/activities/calories/date/${u}/${s}.json`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(function(t){return t.json()}).then(function(t){t["activities-calories"].forEach(function(t){c+=parseInt(t.value)})}).catch(function(t){returnError()})}else r!=a&&(fetch(`https://api.fitbit.com/1.2/user/-/activities/steps/date/${n}/${n}/1min/time/${r}/${a}.json`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(function(t){return t.json()}).then(function(t){o+=parseInt(t["activities-steps"][0].value)}).catch(function(t){returnError()}),fetch(`https://api.fitbit.com/1.2/user/-/activities/calories/date/${n}/${n}/1min/time/${r}/${a}.json`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(function(t){return t.json()}).then(function(t){c+=parseInt(t["activities-calories"][0].value)}).catch(function(t){returnError()}));setTimeout(function(){var t={SyncDate:s,SyncTime:a,Steps:o,Friendship:c};messaging.peerSocket.readyState===messaging.peerSocket.OPEN&&messaging.peerSocket.send(t)},3e3)}function returnError(){setTimeout(function(){messaging.peerSocket.readyState===messaging.peerSocket.OPEN&&messaging.peerSocket.send({SyncDate:"Error",SyncTime:"Error",Steps:"Error",Friendship:"Error"})},3e3)}function restoreSettings(t){var e=!0;for(let n=0;n<settingsStorage.length;n++){let r=settingsStorage.key(n);r&&"oauth"===r&&(e=!1,fetchActivityData(JSON.parse(settingsStorage.getItem(r)).access_token,t))}e&&returnError()}function formatSyncDate(t){if(null!=t){var e=(t=new Date(t)).getDate(),n=t.getMonth()+1;return t.getFullYear()+"-"+(n<10?"0":"")+n+"-"+(e<10?"0":"")+e}return"00-00-0000"}function formatSyncTime(t){if(null!=t){var e=(t=new Date(t)).getHours(),n=t.getMinutes();return(e<10?"0":"")+e+":"+(n<10?"0":"")+n}return"00:00:00"}function truncateTime(t){return t.substring(0,4)}function isFetchedGreater(t,e){var n=!1,r=!1;return t.substring(0,2)<e.substring(0,2)||(t.substring(0,2)==e.substring(0,2)?n=!0:t.substring(3,5)<=e.substring(3,5)&&(r=!0),n&&r)}messaging.peerSocket.onmessage=(t=>{restoreSettings(t.data)}),messaging.peerSocket.onopen=(()=>{});