function assembleElements(elementsToAssemble, regroupedElements) {  //Serve to assemble elements in only one

    for(var i = 0 ; i < elementsToAssemble.length; i++) {
        
        regroupedElements.push(elementsToAssemble[i]);
    }

    return regroupedElements;
}