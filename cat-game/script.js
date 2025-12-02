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

// Track the cat's current horizontal position
let catPosition = startingLeft;
const catSpeed = 20;

// Move the cat and make sure it doesn't fall off the stage
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    catPosition -= catSpeed;
    if (catPosition < 0) {
      catPosition = 0;
    }
  }

  if (event.key === "ArrowRight") {
    catPosition += catSpeed;
    const maxRight = stageWidth - catWidth;
    if (catPosition > maxRight) {
      catPosition = maxRight;
    }
  }

  cat.style.left = catPosition + "px";
});
