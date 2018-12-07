//VARIABLE DECLARATIONS
var treeWord = [];
var guessedLetters = [];
var incorrectLetters = [];


// Creates an array that lists out all of the user options (A-Z).
var validLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Creating variables to hold the number of wins and losses. They start at 0.
var wins = 0;
var losses = 0;
const MAXGUESSESCOUNT = 8;
var guessedAllLetters = false;

// Create variables that hold references to the places in the HTML where we want to display things.
var dashes = document.getElementById("dash-word");
var incorrectLettersText = document.getElementById("guessed-letters-text");
var remainGuesses = document.getElementById("guess-remain-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var startButton = document.getElementById('start-button');
var resetButton = document.getElementById('reset-button');


// Creates an array that lists out all of the word guess options.
var treeName = [
    "ASPEN", 
    "BANYAN", 
    "EVERGREEN", 
    "EUCALYPTUS", 
    "JUNIPER", 
    "MAPLE", 
    "BONSAI", 
    "CHRISTMAS", 
    "WILLOW", 
    "SEQUOIA", 
    "PONDEROSA", 
    "REDWOOD", 
    "SPRUCE"
];

//FUNCTIONS
function startGame() {
    console.log('were starting the game');
    createTreeWord();
    generateGuessesAndDashes();

    // Start listening for letters!
    document.onkeyup = function(event) {
        var guessedLetter = String.fromCharCode(event.keyCode).toUpperCase();
    
        guessLetter(guessedLetter);
    };
}

function resetGame(fullReset) {
    guessedLetters = []
    incorrectLetters = []
    dashes.innerHTML = ''
    incorrectLettersText.innerHTML = ''
    remainGuesses.innerHTML = MAXGUESSESCOUNT
    startGame()
    if (fullReset) {
        wins = 0
        losses = 0
        winsText.innerHTML = wins
        lossesText.innerHTML = losses
    }
}

//Select a random word from tree array when 'Start' button clicked
function createTreeWord() {

    var randomNumber = (Math.random() * treeName.length);
    var roundedNumber = Math.floor(randomNumber);
    treeWord = treeName[roundedNumber].split('');
    console.log('treeWord', treeWord, 'from', treeName, randomNumber);
}

//Creates dashes the same length as chosen word
function generateGuessesAndDashes() {
    var dashWord = [];

    for (var i = 0; i < treeWord.length; i++) {
        var treeLetter = treeWord[i];
        
        if (guessedLetters.includes(treeLetter)) {
            dashWord.push(treeLetter);
        } else {
            dashWord.push("_");
        }
    }
    dashes.innerHTML = dashWord.join(" ");
    if (dashWord.includes('_')) {
        guessedAllLetters = false;
    } else {
        guessedAllLetters = true;
    }
}

function renderGame() {
    generateGuessesAndDashes();
    updateIncorrectLetterList();
    updateWinCount()
    updateLossCount()
    updateRemainGuessLabel()

    console.log('render', guessedLetters, incorrectLetters);

}

function updateWinCount() {
    if (guessedAllLetters) {
        console.log('You Win')
        wins += 1
 
       winsText.innerHTML = wins
       alert('You know your trees! You Won!')
        resetGame(false)
        
    }
}

function updateLossCount() {
    if (incorrectLetters.length === MAXGUESSESCOUNT) {
        console.log('You Lost')
        losses += 1
 
       lossesText.innerHTML = losses
       alert('Sorry, you lost!')
        resetGame(false)
        
    }
}
function updateIncorrectLetterList() {
    incorrectLettersText.innerHTML = incorrectLetters.join(', ')
}

function updateRemainGuessLabel() {
    var incorrectLetterLength = incorrectLetters.length
    var remainLetters = MAXGUESSESCOUNT - incorrectLetterLength
    remainGuesses.innerHTML = remainLetters
}

function guessLetter(letter) {
    if (treeWord.includes(letter)) {
        if (guessedLetters.includes(letter) === false) {
            guessedLetters.push(letter);
        }
    } else if (validLetters.includes(letter)) {
        if (incorrectLetters.includes(letter) === false) {
            incorrectLetters.push(letter);
        }
    }

    renderGame();
}

