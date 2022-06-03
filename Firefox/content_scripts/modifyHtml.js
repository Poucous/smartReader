function modifyHtml(finalElements) { //Process to append <b> tag

    for(var i = 0 ; i < finalElements.length ; i++) { // Loop in all elements filtered

        var values = finalElements[i].childNodes; //Using .childNodes instead .children to have #Text child too

        for(var j = 0 ; j < values.length ; j++) { // Loop for all childNodes of the element filtered

            var nextElement = finalElements[i].childNodes[j].nextElementSibling; //Marker for insertBefore at the end of the loop

            if(values[j].nodeType === 3) { // If nodeType === text

                var textToConvert = values[j].textContent;

                var newText = document.createElement("span");

                newText.style = "display:unset"; // Fix Display problems

                var isLetter = false; // Used to separate words from special characters
                var countLetter = 0; // We only want to bold the first two characters, so, we need an indicator

                var textWorking = ''; // Only text without formatting
                var exclusionCharacter = 0;  // Indicator to avoid text consisting of "\n" or " ", causing display problems

                for(k = 0 ; k < textToConvert.length ; k++) {

                    var bold;
                    var textNode;
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

                if(exclusionCharacter < textToConvert.length) {

                    finalElements[i].insertBefore(newText, nextElement);
    
                    values[j].textContent = '';
                }          
            }   
        }
    }    
}