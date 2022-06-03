function main() {

    var allElements = [];
    var finalElements = [];

    //Regroup all elements that we want to work on
    assembleElements(document.body.getElementsByTagName("P"), allElements);
    assembleElements(document.body.getElementsByTagName("SPAN"), allElements);
    assembleElements(document.body.getElementsByTagName("DIV"), allElements);
    assembleElements(document.body.getElementsByTagName("BR"), allElements);
    assembleElements(document.body.getElementsByTagName("BLOCKQUOTE"), allElements);

    filterElements(allElements, finalElements);

    modifyHtml(finalElements);

}

function isAddonActived() {

    browser.runtime.sendMessage({mode: "state"}, function(message) {

        if(message.mode === "enable") {

            main();

        }
    });
}

isAddonActived();