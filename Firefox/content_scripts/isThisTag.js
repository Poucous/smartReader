function isThisTagParent(elementsToAnalyse, tag, tag2, tag3) {

    /* Check a parent tag going upwards

    Args:
        elementsToAnalyse: elements to analyse
        tag, tag2, tag3: tag to search

    Returns:
        bool: if we found the tag or not

    */

    while(elementsToAnalyse.parentElement) {

        elementsToAnalyse = elementsToAnalyse.parentElement;

        if(elementsToAnalyse.tagName === tag || elementsToAnalyse.tagName === tag2 || elementsToAnalyse.tagName === tag3) {
            return true;
        }
    }

    return false;
}

function isThisTagChild(elementsToAnalyse, tag, tag2, tag3) {

    /* Check a parent tag going down

    Args:
        elementsToAnalyse: elements to analyse
        tag, tag2, tag3: tag to search

    Returns:
        bool: if we found the tag or not

    */

    for(var i = 0 ; i < elementsToAnalyse.children.length ; i++) {

        if(elementsToAnalyse.children[i].tagName === tag || elementsToAnalyse.children[i].tagName === tag2 | elementsToAnalyse.children[i].tagName === tag3) {
            return true;
        }

        if(elementsToAnalyse.tagName === tag || elementsToAnalyse.tagName === tag2 | elementsToAnalyse.tagName === tag3) {
            return true;
        }
    }

    return false;
}