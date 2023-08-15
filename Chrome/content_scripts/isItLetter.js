function isItLetter(char) {

    /* Check if the char is in our range of letters
    Args:
        char: char to analyse
    Returns:
        bool: true if it's a letter
    */

    var letter = (char > 64 && char < 91) || (char > 96 && char < 123) 
                || (char > 191 && char < 208) || (char > 208 && char < 215) 
                || (char > 215 && char < 247) || (char > 247 && char < 256)
                || (char > 1040 && char < 1103);

    return letter;
}
