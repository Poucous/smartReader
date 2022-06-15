function changeMode() {

    /* Allows the user to disable or enable the addon

    By storing the state on the localStorage

    */
 
    if(localStorage.getItem("state") ===  "enable") {

        localStorage.setItem("state", "disable");

        updateIcon("disable");

        browser.tabs.query({}).then((tabs) => {

            for(var i = 0 ; i < tabs.length ; i++) {

                browser.tabs.executeScript(
                    
                    tabs[i].id, {
                    file: "/content_scripts/removeBold.js"
                });
        }});  

    } else if(localStorage.getItem("state") ===  "disable") {

        localStorage.setItem("state", "enable");

        updateIcon("enable");

        browser.tabs.query({}).then((tabs) => {

            for(var i = 0 ; i < tabs.length ; i++) {

                browser.tabs.executeScript(
                    
                    tabs[i].id, {
                    file: "/main.js"
                });
        }});
    }
}