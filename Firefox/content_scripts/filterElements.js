function filterElements(elementsToFilter, finalElements) {

    /* Filter our elements

    Args:
        elementsToFilter: elements to filter
        finalElements: elements filtered

    Returns:
        array: filtered elements

    */

    for(var i = 0; i < elementsToFilter.length; i++) {

        var currentElement = elementsToFilter[i];

        if((textAtRoot(currentElement))
        && (isThisTagParent(currentElement, "NAV", "TABLE", "CODE") === false)
        && (isThisTagChild(currentElement, "SCRIPT", "STYLE", "FONT") === false)
        ) {

            finalElements.push(currentElement);
        }
    }

    return finalElements;
}