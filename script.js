import {Words} from './words.js';

const closeHelpBUtton = document.getElementById("close-button");
const guessButton = document.getElementById("guess-button");
const helpButton = document.getElementById("help-button");
const playButton = document.getElementById("play-button");
const guess = document.getElementById("guess-input");

let usedLetters = [];
let valid = true;
let guesses = 0;
let hiddenWord;
let lives;
let mode;
let word;

// TODO: depending on how much elements are updated, add a function that updates all elements, might make code easier to read.

// utility controls
helpButton.addEventListener("click", function(){
    document.getElementById("help").style.display = "block";
});

closeHelpBUtton.addEventListener("click", function(){
    document.getElementById("help").style.display = "none";
})

// game controls
// TODO add a warning windo that tells you your game will be lost if you press play while guesses is greater than 0.
playButton.addEventListener("click", function(){
    start();
});

// TODO: make guess input clear when guess button is pressed
guessButton.addEventListener("click", function(){
    game();
});

// TODO: something is very wrong with all this code, page reloads every time enter is pressed
/**
 * website is reloaded and all stats and words are cleared
 * need to do some testing
 * issue is only occurs when enter key is pressed, guess button works fine
*/
guess.addEventListener('keypress', (event) => {
    if(event.key == "Enter"){
        game();
    }
});

// setup for the game
function start(){
    guesses = 0;
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
    wordReplace();
    document.getElementById("stats-guesses").innerHTML = "- Guesses: " + guesses;
    document.getElementById("stats-word-length").innerHTML = "- Word length: " + word.length;
    document.getElementById("stats-lives").innerHTML = "- Lives: " + lives;
}

// runs through words, until it finds a word that fits the requirments for the mode.
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
    return word;
}

// replaces letters in the word with underscores. If your guess is in the word, it will replace the underscore coresponding with your guesses location in the word with your guess
// TODO: seperate underscore by spaces to make it easier to see location of guess
function wordReplace(){
    hiddenWord = word;
    for(var i = 0; i != hiddenWord.length; i++){
        hiddenWord = hiddenWord.split('');
        if (guesses <= 0){
            hiddenWord[i] = '_'
        } else if (hiddenWord[i] == guess.value){
            hiddenWord[i] = guess.value;
        }
        hiddenWord = hiddenWord.join('');
    }
    document.getElementById("word-view").innerHTML = hiddenWord;
}

// controls the flow of the game
function game(){
    valid = guessCheck();
    if (valid != false){
        guesses += 1;
        usedLetters.push(guess.value);
    }
    document.getElementById("stats-guesses").innerHTML = "- Guesses: " + guesses;
    valid = true;
    wordReplace();
}

// checks that your guess is 1 character long and is a letter and if your guess is in the word
// if statement does not end in false return because full word check will be added after
function guessCheck(){
    if ((guess.value).length <= 1){
        for (var i = 0; i < usedLetters.length; i++){
            if (guess.value == usedLetters[i]){
                valid = false;
                return valid;
            }
        }
    }
}
