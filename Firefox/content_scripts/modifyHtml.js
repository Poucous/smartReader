function modifyHtml(finalElements) { //Process to append <b> tag

    /* Process to append the <b> tag at our final elements

    Explanation by hierarchy:

    <Loop> with the "i" var:
        Is used to browse all our elements to modify

        <Loop> with the "j" var:
            Is used to browse all childNodes of our current element

            <Condition> (values[j].nodeType === 3):
                If the node type is 3, the node type is a text, and we want to modify only the text

                <Loop> with the "k" var:
                    Browse each character of our current childNodes

    Args:
        finalElements: elements to modify
    
    Returns:
        Nothing

    */

    for(var i = 0 ; i < finalElements.length ; i++) {

        var values = finalElements[i].childNodes; //Using .childNodes instead .children to have #Text child too

        for(var j = 0 ; j < values.length ; j++) {

            var nextElement = finalElements[i].childNodes[j].nextSibling; //Marker used at the end, for insertBefore

            if(values[j].nodeType === 3) {

                var textToConvert = values[j].textContent;

                var newText = document.createElement("span"); // Serve to incubate our textWorking
                newText.className = "smartReader-remove";
                newText.style = "display:unset"; // Fix Display problems

                
                let exclusionCharacter = 0;  // Count "\n" and " " to avoid text only consisting of them, causing display problems

                let node_regex = /([A-zäöüßÄÖÜ])+\w|[^\n]/g
                let word_regex = /([A-zäöüßÄÖÜ])+/g

                let matching_words = textToConvert.match(node_regex)

                matching_words.forEach(word => {
                    if (word_regex.test(word)) {
                        let bold = document.createElement("B")
                        let not_bold = document.createTextNode('')

                        let len = word.length
                        if (len > 2) {
                            len = Math.ceil(len/2)
                            bold.appendChild(document.createTextNode(word.substring(0, len)))
                            not_bold = document.createTextNode(word.substring(len))
                            
                        } else {
                            bold.appendChild(document.createTextNode(word))
                        }

                        newText.appendChild(bold)
                        newText.appendChild(not_bold)
                        
                        
                    } else {
                        newText.appendChild(document.createTextNode(word))
                    }
                    console.log(newText)
                });

                
                finalElements[i].insertBefore(newText, nextElement);
    
                values[j].textContent = '';
                

                /* Our count of exclusionCharacter needs to be lower than the length of our textToConvert

                If exclusionCharacter === textToConvert.length, we're not going to insert,
                because that means that our text is only composed of "\n" and " ",
                because putting these characters in a <span> tag create a display issue

                */        
            }   
        }
    }    
}