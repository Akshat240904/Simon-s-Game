let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Start the game on keypress
document.addEventListener("keydown", function () {
    if (!started) {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = true;
        document.querySelector("h1").innerHTML = "Level " + level;
        nextSequence();
    }
});

// Function to generate the next color in the sequence
function nextSequence() {
    userClickedPattern = []; // Reset user's clicked pattern for this round
    level++;
    document.querySelector("h1").innerHTML = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    flashColour(randomChosenColour);
    makeSound(randomChosenColour);
}

// Event listener for button clicks
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        makeSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1); // Check last input
    });
});

// Function to check if user input matches the game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        document.querySelector("h1").innerHTML = "Game Over! Press Any Key to Restart";
        started = false;
    }
}

// Function to flash button
function flashColour(randomColour) {
    let button = document.getElementById(randomColour);
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash");
    }, 200);
}

// Function to play sound
function makeSound(randomColour) {
    let randomSound = new Audio("sounds/" + randomColour + ".mp3");
    randomSound.play();
}

// Function to animate button press
function animatePress(currentColour) {
    let button = document.getElementById(currentColour);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}
