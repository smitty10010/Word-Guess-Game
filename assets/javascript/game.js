//establish vars up front

var tggArray = ["Previa", "Rikerlean", "Shimoda", "Entrepreneur", "Spacebutthole", "Wesley", "Mclaughlingroup", "Yeager"];
var wins = 1;
var losses = 1;
var userKeys = [];
var guessCounter = 13;
var spacesForLetters = [];
var abc = "abcdefghijklmnopqrstuvwxyz";
var abcArray = abc.split("", abc.length);
var compChoice = computerChoice().toString();
var compChoiceArray = compChoice.split("", compChoice.length);
var audio;
var compChoiceBlankArray;
var BlankArray = [];

//Game restart peramitors

function restartGame() {
    computerChoice();
    compChoice = computerChoice().toString();
    compChoiceArray = compChoice.split("", compChoice.length);
    createBlankSpots(compChoiceArray);
    selectImage(compChoice);
    document.getElementById("audio").removeChild(audio);
    selectAudio(compChoice);
    guessCounter = 13;
    setGuessCounter();
    userKeys = [];
    document.getElementById("guessed-letters").textContent = " " + userKeys;
}
console.log(compChoice);

//Once game is started, the computer chooses at random a word from the array of words

function computerChoice() {
    var randomInt = Math.floor(Math.random() * Math.floor(tggArray.length));
    return tggArray[randomInt].toLowerCase();
}

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

// selects image for the computer's word

function selectImage(word) {
    document.getElementById("image").setAttribute("src", "assets/images/" + word + ".jpg");
}

selectImage(compChoice);

//Selects audio file
function selectAudio(word) {
    newElement = document.createElement("AUDIO");
    newElement.setAttribute("src", "assets/audio/" + word + ".mp3");
    newElement.setAttribute("id", "audioFile");
    document.getElementById("audio").appendChild(newElement);
    audio = document.getElementById("audioFile");
}

selectAudio(compChoice);

//The remaining guesses begins at 13 

function setGuessCounter() {
    document.getElementById("guess-counter").textContent = " " + guessCounter;
}

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
        //checks to see if the player has won. If they have then the game resets and wins are recorded

        if (compChoiceBlankArray.join("").toString() == compChoiceArray.join("").toString()) {
            audio.play();
            alert("You guessed " + compChoice + " correctly! You have won!");
            document.getElementById("wins").textContent = " " + wins++;
            restartGame();
        }
        //checks to see if the key is not a-z

    } else if (abcArray.includes(keyPress) !== true) {
        event.stopPropagation();

        //checks to see if the user already used that key

    } else if (userKeys.includes(keyPress)) {
        event.stopPropagation();

        //checkes to see if player has ran out of guesses. If so then game resets and loss counter goes up

    } else if (guessCounter == 0) {
        alert("Sorry, the word was " + compChoice + ". You have lost!");
        document.getElementById("losses").textContent = " " + losses++;
        restartGame();

        //if user guess wrong then logs key in already guessed array and deprecates counter

    } else {
        document.getElementById("guess-counter").textContent = " " + guessCounter--;
        userKeys.push(keyPress);
        document.getElementById("guessed-letters").textContent = " " + userKeys;
    }

}