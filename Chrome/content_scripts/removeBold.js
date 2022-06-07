function removeBold() {

    /* Resets the text without formatting

    */

    toRemove = document.body.getElementsByClassName("smartReader-remove");

    for(var i = 0 ; i < toRemove.length ; i++) {

        var textFormatting =  '';

        while(toRemove[i].firstChild) {

            textFormatting = textFormatting + toRemove[i].firstChild.textContent;

            toRemove[i].removeChild(toRemove[i].firstChild);        
        }

        var textNode = document.createTextNode(textFormatting);

        toRemove[i].append(textNode);
    }
}

chrome.runtime.sendMessage({mode: "state"}, function(message) {

    if(message.mode === "disable") {

        removeBold();
    }
});