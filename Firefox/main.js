function main() {

    /*  Main function, brings together all the processes

    Starring by grouping all elements that we want.

    Then we pass them in a filter, who's checking if an element is a text, he is not in a nav, script, ... tag.

    And Finally, we give our filtred element to modify the HTML of the page

    */

    var allElements = [];
    var finalElements = [];

    //Grouping
    assembleElements(document.body.getElementsByTagName("P"), allElements);
    assembleElements(document.body.getElementsByTagName("SPAN"), allElements);
    assembleElements(document.body.getElementsByTagName("DIV"), allElements);
    assembleElements(document.body.getElementsByTagName("BR"), allElements);
    assembleElements(document.body.getElementsByTagName("BLOCKQUOTE"), allElements);

    filterElements(allElements, finalElements);

    modifyHtml(finalElements);

}

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

isAddonActived(); //Is addon actived => launch the main function on the page