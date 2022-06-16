import {Words} from './words.js';

const closeHelpBUtton = document.getElementById("close-button");
const guessButton = document.getElementById("guess-button");
const helpButton = document.getElementById("help-button");
const playButton = document.getElementById("play-button");
const guess = document.getElementById("guess-input");

let endCondition = 0;
let usedLetters = [];
let valid = true;
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

// game controls
// TODO add a warning window that tells you your game will be lost if you press play while guesses is greater than 0.
playButton.addEventListener("click", function(){
    start();
});

guessButton.addEventListener("click", function(){
    game();
});

// FIX: something is very wrong with all this code, page reloads every time enter is pressed
/**
 * website is reloaded and all stats and words are cleared
 * need to do some testing
*/
guess.addEventListener('keypress', (event) => {
    if(event.key == "Enter"){
        game();
    }
});

// setup for the game
function start(){
    reset();
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
    console.log(word);
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
// TODO: seperate underscore by spaces to make it easier to see location of guess
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
    document.getElementById("word-view").innerHTML = hiddenWord;
}

// controls the flow of the game
function game(){
    valid = guessCheck();
    if (valid != false){
        guesses += 1;
        usedLetters.push(guess.value);
        if (!word.includes(guess.value)){
            lives -= 1;
        }
    }
    updateStats();
    if (lives <= 0){
        gameOver(endCondition = 1);
    }
    valid = true;
    wordReplace(hiddenWord);
    document.getElementById("guess-input").value = "";
}

// checks that your guess is 1 character long and is a letter
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

// manages what happens when the game ends
function gameOver() {
    if (endCondition == 0){
        console.log("you won!");
    } else if (endCondition = 1){
        console.log("you ran out of lives")
    } else if (endCondition = 2){
        console.log("you gussed the wrong word")
    } else {
        console.log("you gave up");
    }
}

// allows you to not think about what you need to update
function updateStats(){
    document.getElementById("stats-guesses").innerHTML = "- Guesses: " + guesses;
    document.getElementById("stats-word-length").innerHTML = "- Word length: " + word.length;
    document.getElementById("stats-lives").innerHTML = "- Lives: " + lives;
}

function reset(){
    usedLetters = [];
    valid = true;
    guesses = 0;
}
