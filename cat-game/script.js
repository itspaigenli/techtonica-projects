// Variables
let playerScore = 0;
let playerLives = 3;
let fishArray = [];

document.getElementById("scoreDisplay").textContent = playerScore;
document.getElementById("livesDisplay").textContent = playerLives;

const gameStage = document.getElementById("gameStage");
const cat = document.getElementById("cat");

// Get widths
const stageWidth = gameStage.offsetWidth;
const catWidth = cat.offsetWidth;

// Center cat
const startingLeft = stageWidth / 2 - catWidth / 2;
cat.style.left = startingLeft + "px";

let catPosition = startingLeft;
const catSpeed = 20;

// Cat movement
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    catPosition -= catSpeed;
    if (catPosition < 0) catPosition = 0;
  }

  if (event.key === "ArrowRight") {
    const maxRight = stageWidth - catWidth;
    catPosition += catSpeed;
    if (catPosition > maxRight) catPosition = maxRight;
  }

  cat.style.left = catPosition + "px";
});

// Spawn fish
function spawnFish() {
  const fish = document.createElement("div");
  fish.classList.add("fish");

  const fishWidth = 20;
  const randomX = Math.random() * (stageWidth - fishWidth);
  fish.style.left = randomX + "px";
  fish.style.top = "0px";

  gameStage.appendChild(fish);

  fishArray.push({ element: fish, x: randomX, y: 0 });
}

// Make fish fall
function updateGame() {
  const fallSpeed = 3;
  const stageHeight = gameStage.offsetHeight;
  const fishWidth = 20;
  const fishHeight = 20;
  const catHeight = cat.offsetHeight;
  const catTop = stageHeight - catHeight;

  for (let i = fishArray.length - 1; i >= 0; i--) {
    const fish = fishArray[i];

    // ===== 1. MOVE FISH =====
    fish.y += fallSpeed;
    fish.element.style.top = fish.y + "px";

    // ===== 2. COLLISION DETECTION =====
    const fishLeft = fish.x;
    const fishRight = fish.x + fishWidth;
    const fishBottom = fish.y + fishHeight;

    const catLeft = catPosition;
    const catRight = catPosition + catWidth;

    const verticalHit = fishBottom >= catTop;
    const horizontalHit = fishRight >= catLeft && fishLeft <= catRight;

    if (verticalHit && horizontalHit) {
      playerScore++;
      document.getElementById("scoreDisplay").textContent = playerScore;
      gameStage.removeChild(fish.element);
      fishArray.splice(i, 1);
      continue;
    }

    // ===== 3. MISSED FISH =====
    if (fish.y > stageHeight) {
      playerLives--;
      document.getElementById("livesDisplay").textContent = playerLives;

      gameStage.removeChild(fish.element);
      fishArray.splice(i, 1);

      if (playerLives <= 0) {
        alert("Game Over! Final Score: " + playerScore);
        location.reload();
      }
    }
  }
}

// Run game loop
setInterval(spawnFish, 1500);
setInterval(updateGame, 50);
