function handleMessage(message, sender, sendResponse) {

    if(message.mode === "state") {

        var message = localStorage.getItem("state");

        sendResponse({mode: message});
    }
    else {

        sendResponse({mode: "disable"});
    }
}