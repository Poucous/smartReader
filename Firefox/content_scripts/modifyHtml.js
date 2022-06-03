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

            var nextElement = finalElements[i].childNodes[j].nextElementSibling; //Marker used at the end, for insertBefore

            if(values[j].nodeType === 3) {

                var textToConvert = values[j].textContent;

                var newText = document.createElement("span"); // Serve to incubate our textWorking
                newText.style = "display:unset"; // Fix Display problems
  
                var countLetter = 0; // Indicator to only bold the first two characters
                var textWorking = ''; // Text without <b> formatting
                var isLetter = false; // Used to separate words from special characters
                
                var exclusionCharacter = 0;  // Count "\n" and " " to avoid text only consisting of them, causing display problems

                for(k = 0 ; k < textToConvert.length ; k++) {
        
                    var textNode; // Used to create a textNode, contening textWorking
                    var bold; // Used when the condition to append the <b> tag is valid, contening textNode

                    var characterToChange = textToConvert.charAt(k);
                    var secondCharacter = textToConvert.charAt(k + 1);
                    
                    var asciiOfChar = textToConvert.codePointAt(k);

                    isLetter = (asciiOfChar > 64 && asciiOfChar < 91) || (asciiOfChar > 96 && asciiOfChar < 123) || (asciiOfChar > 127 && asciiOfChar < 155);   

                    if(characterToChange === "\n") {

                        textWorking = textWorking + characterToChange;

                        countLetter = 0;
                        exclusionCharacter++;

                    } else if(isLetter === true && countLetter < 2 ) { //This condition is valid at the start of a word
                    
                        if(secondCharacter === " " || secondCharacter === "\n") {

                            exclusionCharacter++;
                        }
                            
                        if(textWorking !== '') { // Adding textWorking in a node to keep the order of the words, because we're going to append a new bold element

                            textNode = document.createTextNode(textWorking);
                            newText.appendChild(textNode);

                            textWorking = '';
                        }

                        bold = document.createElement("B");

                        textNode = document.createTextNode(characterToChange + secondCharacter);

                        bold.appendChild(textNode);

                        newText.appendChild(bold);

                        countLetter = countLetter + 2;

                        k++;

                    } else if(isLetter === false) { // If it's a special character, the count of letter is reset to 0 and we add the text at our TextWorking

                        textWorking = textWorking + characterToChange;

                        countLetter = 0;

                    } else { // We're going here when we got a letter and when (countLetter > 2)

                        textWorking = textWorking + characterToChange;

                        countLetter++;
                    }

                    if(k === textToConvert.length - 1) { // If we are at the end of the loop, we add the text to a node

                        textNode = document.createTextNode(textWorking);
                        newText.appendChild(textNode);
                        textWorking = '';
                    }

                    if(characterToChange === " ") { // Avoid display problems

                        exclusionCharacter++;
                    }
                }

                /* Our count of exclusionCharacter needs to be lower than the length of our textToConvert

                If exclusionCharacter === textToConvert.length, we're not going to insert,
                because that means that our text is only composed of "\n" and " ",
                because putting these characters in a <span> tag create a display issue

                */

                if(exclusionCharacter < textToConvert.length) {

                    finalElements[i].insertBefore(newText, nextElement);
    
                    values[j].textContent = '';
                }          
            }   
        }
    }    
}