if(!localStorage.getItem("state")) {

    localStorage.setItem("state", "enable");

}

browser.runtime.onMessage.addListener(handleMessage);

browser.browserAction.onClicked.addListener(changeMode);