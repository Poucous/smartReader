function isClassSmartReader(elementsToAnalyse, ourClass) {

    /* Check a parent class going down

    Args:
        elementsToAnalyse: elements to analyse
        ourClass: class to search

    Returns:
        bool: if we found the class or not

    */

    for(var i = 0 ; i < elementsToAnalyse.children.length ; i++) {

        if(elementsToAnalyse.children[i].className === ourClass) {
            return true;
        }
    }

    return false;
}

function watchPageUpdates() {

    var observePageUpdates = new MutationObserver(updatePage);
    var container = document.body;
    var config = {childList: true, subtree:true };

    browser.runtime.sendMessage({mode: "state"}, function(message) {

        if(message.mode === "enable") {
    
            observePageUpdates.observe(container, config);

        } else {

            observePageUpdates.disconnect();
        }
    });
    
}

function updatePage(mutationList, observer) {
    /* Update the page when a new DOM appears

    */

    observer.disconnect();
    
    var allElements = [];
    var tempElements = [];
    var finalElements = [];

    //Grouping
    assembleWantedElements(allElements);

    filterElements(allElements, tempElements);

    for(var i = 0 ; i < tempElements.length ; i++) {

        if(isClassSmartReader(tempElements[i], "smartReader-remove") === false && tempElements[i].className !== "smartReader-remove" && tempElements[i].parentNode.className !== "smartReader-remove") {

            finalElements.push(tempElements[i]);
        }
    }

    modifyHtml(finalElements);

    watchPageUpdates();
}