function isThisTagParent(elementsToAnalyse, tag, tag2, tag3) { //Go back to the root for check if tags exist

    while(elementsToAnalyse.parentElement) {

        elementsToAnalyse = elementsToAnalyse.parentElement;

        if(elementsToAnalyse.tagName === tag || elementsToAnalyse.tagName === tag2 || elementsToAnalyse.tagName === tag3) {
            return true;
        }
    }

    return false;
}

function isThisTagChild(elementsToAnalyse, tag, tag2, tag3) { //Check if the tags are in children

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