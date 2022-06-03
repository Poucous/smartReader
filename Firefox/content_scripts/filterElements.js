function filterElements(elementsToFilter, finalElements) { //Filter our assembled elements

    for(var i = 0; i < elementsToFilter.length; i++) {

        var currentElement = elementsToFilter[i];

        if((textAtRoot(currentElement)) //We only take the elements that have text
        && (isThisTagParent(currentElement, "NAV", "TABLE", "CODE") === false)
        && (isThisTagChild(currentElement, "SCRIPT", "STYLE", "FONT") === false) //Exclude some tag names to optimise and avoid graphical bugs
        ) {

            finalElements.push(currentElement);
        }
    }

    return finalElements;

}