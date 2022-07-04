import { WordsSP } from './wordsSP.js';
import { WordsLA } from './wordsLA.js';
import {Words} from './words.js';

const closeEndButton = document.getElementById("end-close-button");
const closeHelpBUtton = document.getElementById("close-button");
const guessButton = document.getElementById("guess-button");
const helpButton = document.getElementById("help-button");
const playButton = document.getElementById("play-button");
const yes = document.getElementById("yes-new-game-btn");
const no = document.getElementById("no-new-game-btn");
const guess = document.getElementById("guess-input");

let endCondition = 0;
let usedLettersFull = [];
let usedLetters = [];
let inGame = false;
let guesses = 0;
let hiddenWord;
let lives;
let mode;
let word;

// utility controls
helpButton.addEventListener("click", function(){
    document.getElementById("help").style.display = "block";
});

closeHelpBUtton.addEventListener("click", function(){
    document.getElementById("help").style.display = "none";
})

closeEndButton.addEventListener("click", function(){
    document.getElementById("game-over").style.display = "none";
    reset();
});
yes.addEventListener("click", function(){
    document.getElementById("new-game").style.display = "none";
    inGame = false;
    reset();
});
no.addEventListener("click", function(){
    document.getElementById("new-game").style.display = "none";
});
// game controls
playButton.addEventListener("click", function(){
    playButtonLogic();
});

guessButton.addEventListener("click", function(){
    game();
});

guess.addEventListener('keypress', (event) => {
    if(event.key == "Enter"){
        game();
    }
});

// controls what the play button does
function playButtonLogic(){
    document.getElementById("play-button").value = "Reset!";
    if (inGame == true){
        document.getElementById("new-game").style.display = "block";
    } else {
        start();
    }
}

// setup for the game
function start(){
    inGame = true;
    if (document.getElementById("hard-mode").checked){
        lives = 6;
        mode = "hard";
    } else if (document.getElementById("easy-mode").checked){
        lives = 24;
        mode = "easy";
    } else {
        lives = 12;
        mode = "normal";
    }
    genWord(mode);
    wordReplace(hiddenWord);
    updateStats();
}

// runs through words until it finds a word that fits the requirments of the mode.
function genWord(mode){
    word = Words[Math.round(Math.random() * Words.length)];
    if (mode == "hard") {
        while (word.length <= 10){
            word = Words[Math.round(Math.random() * Words.length)];
        }
    } else if (mode == "easy") {
        while (word.length >= 5) {
            word = Words[Math.round(Math.random() * Words.length)];
        }
    }
    hiddenWord = word;
    return word, hiddenWord;
}

// creates the blank word and fills word in as you guess letters
function wordReplace(){
    for(var i = 0; i != hiddenWord.length; i++){
        hiddenWord = hiddenWord.split('');
        if (guesses <= 0){
            hiddenWord[i] = '_'
        } else if (word[i] == guess.value){
            hiddenWord[i] = guess.value;
        }
        hiddenWord = hiddenWord.join('');
    }

    if (hiddenWord == word){
        gameOver(endCondition = 0);
    }
    document.getElementById("word-view").innerHTML = hiddenWord;
}

// controls the flow of the game
function game(){
    let valid = guessCheck();
    usedLettersFull.push(guess.value);
    if (valid != false){
        guesses += 1;
        if (!word.includes(guess.value)){
            lives -= 1;
            usedLetters.push(guess.value);
        }
    }
    updateStats();
    if (lives <= 0){
        gameOver(endCondition = 1);
    }
    wordReplace(hiddenWord);
    document.getElementById("guess-input").value = "";
}

// checks that your guess is 1 character long, is a letter, not used
function guessCheck(){
    if ((guess.value).length <= 1 && isNaN(guess.value)){
        for (var i = 0; i < usedLettersFull.length; i++){
            if (guess.value == usedLettersFull[i]){
                return false;
            }
        }
    } else {
        return false;
    }
}

// manages what happens when the game ends
function gameOver() {
    if (endCondition == 0){
        endCondition = "You won!";
    } else if (endCondition = 1){
        endCondition = "Out of lives :(";
    } else if (endCondition = 2){
        endCondition = "Wrong guess :(";
    } else {
        endCondition = "You gave up";
    }
    document.getElementById("game-over-title").innerHTML = endCondition;
    document.getElementById("end-mode").innerHTML = "Mode: " + mode;
    document.getElementById("end-word").innerHTML = "Word: " + word;
    document.getElementById("end-word-length").innerHTML = "Word length: " + word.length;
    document.getElementById("end-guesses").innerHTML = "Guesses: " + guesses;
    document.getElementById("end-lives").innerHTML = "Lives: " + lives;
    document.getElementById("game-over").style.display = "block";
    console.log("test");
}

// allows you to not think about what you need to update
function updateStats(){
    document.getElementById("used-letters").innerHTML = usedLetters;
    document.getElementById("stats-guesses").innerHTML = "Guesses: " + guesses;
    document.getElementById("stats-word-length").innerHTML = "Word length: " + word.length;
    document.getElementById("stats-lives").innerHTML = "Lives: " + lives;
}

function reset(){
    usedLettersFull = [];
    usedLetters = [];
    guesses = 0;
    document.getElementById("stats-word-length").innerHTML = "Word length: N/A";
    document.getElementById("stats-guesses").innerHTML = "Guesses: 0";
    document.getElementById("stats-lives").innerHTML = "Lives: N/A";
    document.getElementById("word-view").innerHTML = "Word";
    document.getElementById("used-letters").innerHTML = "Used Letters";
    document.getElementById("guess-input").value = "";
    document.getElementById("play-button").value = "Play!";
}
