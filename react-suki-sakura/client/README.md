# Suki’s Sakura Catch! 🌸🐾

A simple React game where you move Suki left/right to catch falling sakura blossoms. Choose a difficulty, press Start, and try not to miss too many!

## How to Play (User Perspective)

1. Enter a **Player Name**
2. Choose **Difficulty** (Easy / Normal / Hard)
3. Click **Start**
4. Use **← / → arrow keys** to move Suki
5. **Catch blossoms** to increase your score
6. If you miss too many blossoms, it’s **Game Over**

## Controls

- **ArrowLeft / ArrowRight**: move Suki
- **Start**: begins a new game
- **Pause**: pauses the game
- **Reset**: clears score + misses, re-centers Suki

## Game Rules

- Blossoms fall from random X positions.
- If a blossom enters the “catch zone” near the bottom AND is close enough to Suki’s X position, it’s counted as **caught**.
- If a blossom falls off-screen, it counts as a **miss**.
- When misses reach the difficulty limit, the game stops and shows **Game Over**.

## Tech Highlights (What to Look For in the Code)

- **Difficulty tuning** via `useMemo()` (spawn rate, speed, max misses, movement step)
- **Falling loop** at ~60fps (`setInterval` every 16ms) + position updates
- **Hit detection** using a catch-zone Y range + X-distance window
- **Smooth movement** using keydown/keyup + a separate movement loop (hold-to-move)

## Run Locally

```bash
npm install
npm run dev
```
