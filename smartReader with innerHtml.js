function assembleElements(elementsToAssemble, regroupedElements) {  //Serve to assemble elements in only one

    for(var i = 0 ; i < elementsToAssemble.length; i++) {
        
        regroupedElements.push(elementsToAssemble[i]);
    }

    return regroupedElements;
}

function isThisTagParent(elementsToAnalyse, tag, tag2, tag3) { //Go up to the root for check if the tag exist

    while(elementsToAnalyse.parentElement) {

        elementsToAnalyse = elementsToAnalyse.parentElement;

        if(elementsToAnalyse.tagName === tag || elementsToAnalyse.tagName === tag2 || elementsToAnalyse.tagName === tag3) {
            return true;
        }
    }

    return false;
}

function isThisTagChild(elementsToAnalyse, tag, tag2, tag3) {

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

function textAtRoot(elementToAnalyse) {

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

function childHaveChild(parent) {

    for(var i = 0 ; i < parent.length ; i++) {

        for(var j = 0 ; j < parent[i].children.length ; j++) {

            if(parent[i].children[j].length > 0) {

                return true;
            }
        }     
    }

    return false;
}

function filterElements(elementsToFilter, finalElements) {

    for(var i = 0; i < elementsToFilter.length; i++) {

        var currentElement = elementsToFilter[i];

        if((textAtRoot(currentElement)) //To search text, we do no want child element and empty text element
        && (isThisTagParent(currentElement, "NAV", "TABLE", "CODE") === false) //Exclude navigation, table tab
        && (isThisTagChild(currentElement, "SCRIPT", "STYLE", "FONT") === false)
        ) {

            finalElements.push(currentElement);
        }
    }

    return finalElements;

}

function modifyHtml(finalElements) {

    for(var i = 0; i < finalElements.length; i++) { //Work on our finalElements to format the text

        /*  This loop add B tag (to grow) on the first 2 letters 
            If the char is not on our range of letters
            ...
            ...
            ...
        */
    
        var isLetter = false;
        var countLetter = 0;
    
        var textToConvert = finalElements[i].textContent;
        var myNewText = '';
    
        for(var j = 0; j < textToConvert.length; j++) 
        {
            var characterToChange = textToConvert.charAt(j);
            var secondCharacter = textToConvert.charAt(j + 1);
            
            var asciiOfChar = textToConvert.codePointAt(j);
            isLetter = (asciiOfChar > 64 && asciiOfChar < 91) || (asciiOfChar > 96 && asciiOfChar < 123) || (asciiOfChar > 127 && asciiOfChar < 155);
    
            if(characterToChange === "\\" && secondCharacter === "n") {
    
                if(myNewText  !== '') {
                    myNewText = myNewText + characterToChange + secondCharacter;
                }
                else {
                    myNewText = characterToChange + secondCharacter;
                }
    
                j++;
            }
            else if(isLetter === true && countLetter < 2) { 
    
                if(myNewText !== '') {
                    myNewText = myNewText + "<b>" + characterToChange + secondCharacter + "</b>";
                }
                else {
                    myNewText = "<b>" + characterToChange + secondCharacter + "</b>";
                }
                
                countLetter = countLetter + 2;
                j++;
            }
            else if(isLetter !== true) {
    
                if(myNewText  !== '') {
                    myNewText = myNewText + characterToChange;
                }
                else {
                    myNewText = characterToChange;
                }
                
                countLetter = 0;
            }
            else {
                if(myNewText  !== '') {
                    myNewText = myNewText + characterToChange;
                }
                else {
                    myNewText = characterToChange;
                }
                countLetter++;
            }
        }
    
        finalElements[i].innerHTML = myNewText;

    }

}

function testHtml(finalElements) {

    for(var i = 0 ; i < finalElements.length ; i++) {

        var values = finalElements[i].childNodes;

        for(var j = 0 ; j < values.length ; j++) {

            var nextElement = finalElements[i].childNodes[j].nextElementSibling;

            console.log(nextElement);

            if(values[j].nodeType === 3) {

                var textToConvert = values[j].textContent;

                var newText = document.createElement("span");

                var isLetter = false;
                var countLetter = 0;

                var textWorking = '';

                for(k = 0 ; k < textToConvert.length ; k++) {

                    var bold;
                    var textNode;
                    var characterToChange = textToConvert.charAt(k);
                    var secondCharacter = textToConvert.charAt(k + 1);

                    var asciiOfChar = textToConvert.codePointAt(k);

                    isLetter = (asciiOfChar > 64 && asciiOfChar < 91) || (asciiOfChar > 96 && asciiOfChar < 123) || (asciiOfChar > 127 && asciiOfChar < 155);   

                    if(isLetter === true && countLetter < 2 ) {

                        if(textWorking !== '') {

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
                    }
                    else if(isLetter === false) {

                        textWorking = textWorking + characterToChange;

                        countLetter = 0;
                    }
                    else {

                        textWorking = textWorking + characterToChange;

                        countLetter++;
                    }

                    if(k === textToConvert.length - 1) {

                        textNode = document.createTextNode(textWorking);
                            newText.appendChild(textNode);

                            textWorking = '';

                    }
                }
               
                finalElements[i].insertBefore(newText, nextElement);

                values[j].textContent = '';

            }
            
        }

    }
    
}

function main(){

    var allElements = [];
    var finalElements = [];

    //Regroup all elements that we want to work on
    assembleElements(document.body.getElementsByTagName("P"), allElements);
    assembleElements(document.body.getElementsByTagName("SPAN"), allElements);
    assembleElements(document.body.getElementsByTagName("DIV"), allElements);
    assembleElements(document.body.getElementsByTagName("BR"), allElements);
    assembleElements(document.body.getElementsByTagName("A"), allElements);

    filterElements(allElements, finalElements);

    //modifyHtml(finalElements);

    testHtml(finalElements);

}

main();