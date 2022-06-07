function assembleElements(elementsToAssemble, regroupedElements) {

    /* Assemble elements in only one array

    Args: 
        elementsToAssemble: an array to add at the regroupedELements array
        regroupedELements: we add our elementsToAssemble elements

    Returns: 
        array: contains with the new elements added

    */

    for(var i = 0 ; i < elementsToAssemble.length; i++) {
        
        regroupedElements.push(elementsToAssemble[i]);
    }

    return regroupedElements;
}