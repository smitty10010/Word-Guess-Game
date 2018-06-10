//Need an event listener for keypress to start game //Create an array for the computer to choose from 
// var tggArray = ["Bangers", "Veto", "Shimoda", "Entrepreneur", "Ro"];
var tggArray = ["Entrepreneur"];
var userKeys = [];
var guessCounter = 13;
var spacesForLetters = [];
var abc = "abcdefghijklmnopqrstuvwxyz";
var abcArray = abc.split("", abc.length);
//Once game is started, the computer chooses at random a word from the array of words

function computerChoice() {
    var randomInt = Math.floor(Math.random() * Math.floor(tggArray.length));
    return tggArray[randomInt].toLowerCase();
}
var compChoice = computerChoice().toString();
var compChoiceArray = compChoice.split("", compChoice.length);
var BlankArray = [];
console.log(compChoiceArray);

//Blank spaces appear to the user where the chosen word would be, example "_ _ _ _ _"

function createBlankSpots(array) {
    compChoiceBlankArray = BlankArray.concat(array);
    compChoiceBlankArray.fill("_")
    document.getElementById("current-word").textContent = compChoiceBlankArray.join(" ");
}
createBlankSpots(compChoiceArray);

function guessedLetters(array) {
    document.getElementById("current-word").textContent = array.join(" ");
}

//The remaining guesses begins at 13 


document.getElementById("guess-counter").textContent = " " + guessCounter;

//The letter the player guesses incorrectly appears in the already guessed box

var userGuess = document.onkeyup = function(event) {
    var keyPress = event.key.toLowerCase();

    //The letter the player guesses correctly appears in the blank spot of the current word box example "_ h _"

    if (compChoiceArray.includes(keyPress)) {
        for (i = 0; i < compChoiceArray.length; i++) {
            var indexCompChoice = compChoiceArray.indexOf(keyPress, i);
            compChoiceBlankArray[indexCompChoice] = keyPress;
            guessedLetters(compChoiceBlankArray);
        }
        //checks to make sure the key pressed is a-z
    } else if (abcArray.includes(keyPress) !== true) {
        event.stopPropagation();
        //checks to see if the user already used that key
    } else if (userKeys.includes(keyPress)) {
        event.stopPropagation();
        //if user guess wrong then logs key in already guessed array and deprecates counter
    } else {
        document.getElementById("guess-counter").textContent = " " + guessCounter--;
        userKeys.push(keyPress);
        document.getElementById("guessed-letters").textContent = " " + userKeys;

    }
}


//If the player runs out of guesses then game resets and alerts player that they have lost 

// If the player finishes the word before running out of guesses then the game resets with a new word and the win counter goes up