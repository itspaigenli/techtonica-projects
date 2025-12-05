// Variables
let playerScore = 0;
let playerLives = 3;
let fishArray = [];

document.getElementById("scoreDisplay").textContent = "Score: " + playerScore; //This puts the live score and lives into the UI
document.getElementById("livesDisplay").textContent = "Lives: " + playerLives;

const gameStage = document.getElementById("gameStage"); //grabbing things from the html
const cat = document.getElementById("cat");

// Get widths (establishing boundaries to keep kitty inside the play box)
const stageWidth = gameStage.offsetWidth;
const catWidth = cat.offsetWidth;

// Center cat (math that determines a middle starting point inside the game stage area)
const startingLeft = stageWidth / 2 - catWidth / 2;
cat.style.left = startingLeft + "px";

let catPosition = startingLeft; //This is code that helps track the cat in real time
const catSpeed = 20;

// Cat movement (HARD Section - Needed AI to assist, event listeners to promote movement)
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

  cat.style.left = catPosition + "px"; //This moves the cat visually in the UI to the updated position after event-listeners trigger
});

// Spawn fish (movement vertically, randomizing fish falling locations along an x-axis)
function spawnFish() {
  const fish = document.createElement("div");
  fish.classList.add("fish");

  const fishWidth = 20;
  const randomX = Math.random() * (stageWidth - fishWidth);
  fish.style.left = randomX + "px";
  fish.style.top = "0px";

  gameStage.appendChild(fish); //appendChild puts the fish into the game box in the UI

  fishArray.push({ element: fish, x: randomX, y: 0 }); // 'pushes' my fish onto the end of the stack
}

// Make fish fall (HARD - needed AI to assist; )
function updateGame() {
  const fallSpeed = 3; //fish fall 3px at a time
  const stageHeight = gameStage.offsetHeight; //measurements needed to determine collision
  const fishWidth = 20;
  const fishHeight = 20;
  const catHeight = cat.offsetHeight;
  const catTop = stageHeight - catHeight;

  for (let i = fishArray.length - 1; i >= 0; i--) {
    //a loop that runs in reverse
    const fish = fishArray[i];

    fish.y += fallSpeed;
    fish.element.style.top = fish.y + "px";

    const fishLeft = fish.x; //calculating the edges of the 'fish'
    const fishRight = fish.x + fishWidth;
    const fishBottom = fish.y + fishHeight;

    const catLeft = catPosition; //calculates the edges of the 'cat'
    const catRight = catPosition + catWidth;

    const verticalHit = fishBottom >= catTop; //collision detetction rules
    const horizontalHit = fishRight >= catLeft && fishLeft <= catRight;

    if (verticalHit && horizontalHit) {
      //what happens if line 76-77 are triggered
      playerScore++;
      document.getElementById("scoreDisplay").textContent =
        "Score: " + playerScore; //upate UI

      gameStage.removeChild(fish.element);
      fishArray.splice(i, 1);
      continue;
    }

    if (fish.y > stageHeight) {
      //if the fish is missed, what happens
      playerLives--;
      document.getElementById("livesDisplay").textContent =
        "Lives: " + playerLives;

      gameStage.removeChild(fish.element);
      fishArray.splice(i, 1); //remove the fish after an interaction

      if (playerLives <= 0) {
        alert("Game Over! Final Score: " + playerScore);
        location.reload();
      }
    }
  }
}

// Run game loop (loops the entire JS given these parameters of 1.5s spawning a new fish and 0.05s relocate the fish)
setInterval(spawnFish, 1500);
setInterval(updateGame, 50);
