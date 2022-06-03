function isAddonActived() {

    /* Serve to communicate with the background script: background.js

    We need this to make a link with the tool bar.

    Because we can disable the addon by clicking on his button.

    */

    browser.runtime.sendMessage({mode: "state"}, function(message) {

        if(message.mode === "enable") {

            main();
        }
    });
}