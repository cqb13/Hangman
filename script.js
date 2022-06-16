import {Words} from './words.js';

const closeHelpBUtton = document.getElementById("close-button");
const hiddenWordView = document.getElementById("word-view");
const guessButton = document.getElementById("guess-button");
const helpButton = document.getElementById("help-button");
const playButton = document.getElementById("play-button");
const guess = document.getElementById("guess-input");

let word;
let mode;
let lives;
let hiddenWord;
let guesses = 0;
let usedLetters = [];

// utility controls
helpButton.addEventListener("click", function(){
    document.getElementById("help").style.display = "block";
});

closeHelpBUtton.addEventListener("click", function(){
    document.getElementById("help").style.display = "none";
})

// game controls
playButton.addEventListener("click", function(){
    start();
});

guessButton.addEventListener("click", function(){
    guess = guess.value;
    game(guess);
});

guess.addEventListener('keypress', (event) => {
    if(event.key == "Enter"){
        game(guess);
    }
});

function start(){
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
    document.getElementById("stats-word-length").innerHTML = "- Word length: " + word.length;
    document.getElementById("stats-lives").innerHTML = "- Lives: " + lives;
}

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
    console.log(word);
    return word;
}
