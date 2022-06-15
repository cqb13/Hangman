const closeHelpBUtton = document.getElementById("close-button");
const hiddenWordView = document.getElementById("word-view");
const guessButton = document.getElementById("guess-button");
const helpButton = document.getElementById("help-button");
const guess = document.getElementById("guess-input");

let word;
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

}

function game(){

}

function validGuess(){

}

function guessCheck(){

}

function guessView(){

}

function fullGuess(){

}

function endCheck(){

}

function deadCheck(){

}
