function assembleWantedElements(regroupedElements) {

    /* Assemble all searched elements in only one array

    Args:
        regroupedELements: we add our searched elements

    Returns: 
        array: contains with all the searched elements

    */

    var tagsWanted = ["P", "SPAN", "DIV", "BR", "BLOCKQUOTE", "EM"];

    for(var i = 0 ; i < tagsWanted.length ; i++) {

        var tagWanted = document.body.getElementsByTagName(tagsWanted[i]);

        for(var j = 0 ; j < tagWanted.length; j++) {
        
            regroupedElements.push(tagWanted[j]);
        }

    }

    return regroupedElements;
}