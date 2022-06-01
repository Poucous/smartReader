function handleMessage(message, sender, sendResponse) {

    if(message.mode === "state") {

        var message = localStorage.getItem("state");

        sendResponse({mode: message});
    }
    else {

        sendResponse({mode: "disable"});
    }
}

function updateIcon(state) {

    var isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(state === "enable") {

        if(isDarkTheme.matches) {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "icons/button/smartReader-white-16.png",
                    "32": "icons/button/smartReader-white-32.png"
                }
            
            });

        } else {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "icons/button/smartReader-black-16.png",
                    "32": "icons/button/smartReader-black-32.png"
                }
            
            });

        }
        
    } else if(state === "disable") {

        if(isDarkTheme.matches) {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "icons/button/smartReader-black-16.png",
                    "32": "icons/button/smartReader-black-32.png"
                }
            
            });

        } else {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "icons/button/smartReader-white-16.png",
                    "32": "icons/button/smartReader-white-32.png"
                }
            
            });

        }
    }
}

function changeMode() {

    if(localStorage.getItem("state") ===  "enable") {

        localStorage.setItem("state", "disable");

        updateIcon("disable");

    } else if(localStorage.getItem("state") ===  "disable") {

        localStorage.setItem("state", "enable");

        updateIcon("enable");

    }
}

if(!localStorage.getItem("state")) {

    localStorage.setItem("state", "enable");

}

browser.runtime.onMessage.addListener(handleMessage);

browser.browserAction.onClicked.addListener(changeMode);