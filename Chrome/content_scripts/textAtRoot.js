function textAtRoot(elementToAnalyse) { 
    /* Check if there's text at the base

    Args:
        elementToAnalyse: element to analyse
    
    Returns:
        bool: true is there is a text

    */

    nodes = elementToAnalyse.childNodes;

    for(var i = 0 ; i < nodes.length ; i++) {

        if(nodes[i].nodeName === "#text") {
            
            return true;
        }
    }

    return false;
}