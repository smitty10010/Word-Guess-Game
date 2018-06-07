//Need an event listener for keypress to start game //Create an array for the computer to choose from 
var tggArray = ["Bangers", "Veto", "Shimoda", "Entrepreneur", "Ro"];
var userKeys = [];
var guessCounter = 13;
//Once game is started, the computer chooses at random a word from the array of words

function computerChoice() {
    var randomInt = Math.floor(Math.random() * Math.floor(tggArray.length));
    return tggArray[randomInt].toLowerCase();
}
var compChoice = computerChoice().toString();
console.log(compChoice);
//Blank spaces appear to the user where the chosen word would be, example "_ _ _ _ _"

function createBlankSpots(string) {
    for (var i = 0; i <= string.length; i++) {
        document.getElementById("current-word").textContent = " _ ".repeat(i);
    }
}
createBlankSpots(compChoice);
//The remaining guesses begins at 13 

function guessCounterD() {
    document.getElementById("guess-counter").textContent = " " + guessCounter;
}

guessCounterD();

//The letter the player guesses incorrectly appears in the already guessed box

var userGuess = document.onkeyup = function(event) {
    var keyPress = event.key;
    userKeys.push(" " + keyPress);
    document.getElementById("guessed-letters").textContent = userKeys;

    if (compChoice.includes(keyPress)) {
        document.getElementById("guess-counter").textContent = " " + guessCounter--;
    }
};

//The letter the player guesses correctly appears in the blank spot of the current word box example "_ h _" 
//If the player runs out of guesses then game resets and alerts player that they have lost 
//If the player finishes the word before running out of guesses then the game resets with a new word and the win counter goes up