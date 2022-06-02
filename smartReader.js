function assembleElements(elementsToAssemble, regroupedElements) {  //Serve to assemble elements in only one

    for(var i = 0 ; i < elementsToAssemble.length; i++) {
        
        regroupedElements.push(elementsToAssemble[i]);
    }

    return regroupedElements;
}

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

function textAtRoot(elementToAnalyse) { //Check if there's text at the base, .textContent wasn't a solution because it gives children text too

    nodes = elementToAnalyse.childNodes;

    for(var i = 0 ; i < nodes.length ; i++) {

        if(nodes[i].nodeName === "#text") {
            
            return true;
        }
    }

    return false;
}

function displayElements(elementsToDisplay) {

    for(var i = 0; i < elementsToDisplay.length ; i++){

        console.log(elementsToDisplay[i]);
    }
}

function childrenHaveChildren(parent) { //Unused

    for(var i = 0 ; i < parent.length ; i++) {

        for(var j = 0 ; j < parent[i].children.length ; j++) {

            if(parent[i].children[j].length > 0) {

                return true;
            }
        }     
    }

    return false;
}

function filterElements(elementsToFilter, finalElements) { //Filter our assembled elements

    for(var i = 0; i < elementsToFilter.length; i++) {

        var currentElement = elementsToFilter[i];

        if((textAtRoot(currentElement)) //We only take the elements that have text
        && (isThisTagParent(currentElement, "NAV", "TABLE", "CODE") === false)
        && (isThisTagChild(currentElement, "SCRIPT", "STYLE", "FONT") === false) //Exclude some tag names to optimise and avoid graphical bugs
        ) {

            finalElements.push(currentElement);
        }
    }

    return finalElements;

}

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

function main() {

    var allElements = [];
    var finalElements = [];

    //Regroup all elements that we want to work on
    assembleElements(document.body.getElementsByTagName("P"), allElements);
    assembleElements(document.body.getElementsByTagName("SPAN"), allElements);
    assembleElements(document.body.getElementsByTagName("DIV"), allElements);
    assembleElements(document.body.getElementsByTagName("BR"), allElements);
    assembleElements(document.body.getElementsByTagName("BLOCKQUOTE"), allElements);

    filterElements(allElements, finalElements);

    modifyHtml(finalElements);

}

function isAddonActived() {

    browser.runtime.sendMessage({mode: "state"}, function(message) {

        if(message.mode === "enable") {

            main();

        }
    });
}

isAddonActived();