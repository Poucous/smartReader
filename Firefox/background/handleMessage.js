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

        var message = localStorage.getItem("state");

        sendResponse({mode: message});
    }
    else {

        sendResponse({mode: "disable"});
    }
}