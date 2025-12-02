# Collect Fish Game 🐱🐟

## Demo

[Demo Link](#)

## Description

Catch the falling fish with your cat!
Use the left and right arrow keys to move the cat.
Each fish you catch increases your score. Missing a fish decreases your lives.
Game ends when you run out of lives.

## How to Play

1. Open `index.html` in your browser.
2. Move the cat using **Arrow Left** and **Arrow Right** keys.
3. Catch the falling fish.
4. Watch your **Score** and **Lives** at the top.
5. Game ends when lives reach 0.

## Features / Requirements Covered

- Variables for numbers and strings (`score`, `lives`, `catPosition`)
- Math operations and increments/decrements (`score++`, `catPosition += 20`)
- Random numbers (`Math.random()`)
- Strings and string length/indexing (used for `id`, `class`, `style`)
- Arrays (`fishArray`) and nested data (objects inside array)
- Array methods: `push()`, `splice()`
- Functions with arguments (`createFish()`, `updateGame()`)
- Global vs local scope examples (`score` global, `fish` local)
- DOM manipulation (`document.createElement`, `appendChild`, `getElementById`)
- `setInterval()` for game loop
- HTML, JS, and CSS separate files

## Files

- `index.html` – main HTML file
- `style.css` – styles for cat, fish, and game area
- `script.js` – game logic

## How to Run

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Enjoy the game!

## Notes

- Cat and fish are simple colored divs (no images needed).
- You can increase difficulty by adjusting fish speed or spawn rate.
- CSS can be customized, but the game logic works without extra styling.
