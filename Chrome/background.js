function updateIcon(state) {

    /* Update the icon when the mode is changed

    Args:
        state: state of the addon

    Returns: nothing

    */

    if(state === "enable") {

        chrome.action.setIcon({

            path : {

                "16": "/icons/button/smartReader-16.png",
                "32": "/icons/button/smartReader-32.png"
            }      
        });
  
    } else if(state === "disable") {

        chrome.action.setIcon({

            path : {

                "16": "/icons/button/smartReader-disabled-16.png",
                "32": "/icons/button/smartReader-disabled-32.png"
            }    
        });
    }
}

function handleMessage(message, sender, sendResponse) {

    /* Serve to communicate with the content script: main.js

    If we receive a message contening "mode: state", we're
    replying the state

    Args:
        message: content of the received message
        sender: sender, unused
        sendResponse:  link to send a response
    
    Returns:
        Nothing

    */

    if(message.mode === "state") {

        state = chrome.storage.local.get(["state"], function(mode)  {

            sendResponse({mode: mode.state});
        });

        return true;
    } else {

        sendResponse({mode: "disable"});
    }

    return false;
}

function changeMode() {

    /* Allows the user to disable or enable the addon

    By storing the state on the localStorage

    */


    chrome.storage.local.get(["state"], function(mode) {

        if(mode.state === "enable")  {

            updateIcon("disable");
    
            var state = "state";
            var obj = {};
        
            obj[state] = "disable";
          
            chrome.storage.local.set(obj);

            chrome.tabs.query({}).then((tab) => {

            for(var i = 0 ; i < tab.length ; i++) {

                chrome.scripting.executeScript({
                    
                    target: {tabId: tab[i].id} ,
                    files: ["/content_scripts/removeBold.js"],
                });

            }});

        } else if(mode.state === "disable") {

            updateIcon("enable");

            var state = "state";
            var obj = {};
        
            obj[state] = "enable";
          
            chrome.storage.local.set(obj);

            chrome.tabs.query({}).then((tab) => {

            for(var i = 0 ; i < tab.length ; i++) {

                chrome.scripting.executeScript({
                   
                    target: {tabId: tab[i].id},
                    files: ["/main.js"],
                });
            }});
        }
    });
}

// Store enable state if it doesn't exist
chrome.storage.local.get(["state"], function(mode) {

    if(mode.state !== "enable" && mode.state !== "disable")  {

        var state = "state";
        var obj = {};
    
        obj[state] = "enable";
        
        chrome.storage.local.set(obj);
    }
    else if(mode.state === "disable") {

        updateIcon("disable");
    }
});

chrome.runtime.onMessage.addListener(handleMessage); // Listen message from isAddonActived

chrome.action.onClicked.addListener(changeMode); // If the user click on the icon of the toolBar