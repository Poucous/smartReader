function updateIcon(state) {

    /* Update the icon when the mode is changed

    Args:
        state: state of the addon

    Returns: nothing

    */

    var isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(state === "enable") {

        if(isDarkTheme.matches) {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "/icons/button/smartReader-white-16.png",
                    "32": "/icons/button/smartReader-white-32.png"
                }
            
            });

        } else {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "/icons/button/smartReader-black-16.png",
                    "32": "/icons/button/smartReader-black-32.png"
                }
            
            });

        }
        
    } else if(state === "disable") {

        if(isDarkTheme.matches) {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "/icons/button/smartReader-black-16.png",
                    "32": "/icons/button/smartReader-black-32.png"
                }
            
            });

        } else {

            browser.browserAction.setIcon({

                path : {
    
                    "16": "/icons/button/smartReader-white-16.png",
                    "32": "/icons/button/smartReader-white-32.png"
                }
            
            });
        }
    }
}