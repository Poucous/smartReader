function textAtRoot(elementToAnalyse) { //Check if there's text at the base, .textContent wasn't a solution because it gives children text too

    nodes = elementToAnalyse.childNodes;

    for(var i = 0 ; i < nodes.length ; i++) {

        if(nodes[i].nodeName === "#text") {
            
            return true;
        }
    }

    return false;
}