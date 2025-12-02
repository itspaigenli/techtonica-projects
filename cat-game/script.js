// Variables
let playerScore = 0;
let playerLives = 3;

//Display score and lives
document.getElementById("scoreDisplay").textContent = playerScore;
document.getElementById("livesDisplay").textContent = playerLives;

// Access and move cat with arrow keys
const gameStage = document.getElementById("gameStage");
const cat = document.getElementById("cat");

// Get widths
const stageWidth = gameStage.offsetWidth;
const catWidth = cat.offsetWidth;

// Calculate center position
const startingLeft = stageWidth / 2 - catWidth / 2;

// Position the cat
cat.style.left = startingLeft + "px";

// Function to create fish
// Update game: move fish, check collisions
// Create fish every 1.5 seconds
// Update game every 50ms
