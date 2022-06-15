function handleMessage(message, sender, sendResponse) {

    /* Serve to communicate with the content script: main.js and the popup page : smartReader_popup.js

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

        var message = localStorage.getItem("state");

        sendResponse({mode: message});
    }

    if(message.changeMode === "yep") {

        changeMode();

        sendResponse({state: "done"});
    }
}