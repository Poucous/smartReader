// Store if state if it doesn't exist
if(!localStorage.getItem("state")) {

    localStorage.setItem("state", "enable");
}

if(localStorage.getItem("state") === "disable") {

    updateIcon("disable");
}

browser.runtime.onMessage.addListener(handleMessage); // Listen message from main.js

browser.runtime.onMessage.addListener(changeModeMessage); // Listen message from smartReader_popup.js