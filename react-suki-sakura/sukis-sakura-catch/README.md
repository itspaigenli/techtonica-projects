---

## Your final demo flow (what you show + what you say)

### 1) Start from the user view (App.jsx)
**Show:** Title, name input, difficulty dropdown, Start button, arena.  
**Say:** “App owns player name and difficulty, then passes them into Game as props. That keeps the game logic isolated in one component.”

**Code anchor:** `App.jsx` → `<Game playerName=... difficulty=... />`

---

### 2) Difficulty system (Game.jsx – `useMemo`)

**Say:** “Difficulty changes _multiple systems at once_: fall speed, spawn rate, how many misses allowed, and movement step.”

**Code anchor:** the `useMemo()` that returns:

- `fallSpeed`, `spawnMs`, `maxMisses`, `moveStep`, `catchWindowX`, `maxOnScreen`

---

### 3) Blossoms spawning (Game.jsx – spawn loop)

**Say:** “While running, a blossom spawns on an interval. I also cap the max blossoms on screen to prevent overload.”

**Code anchor:**

- `spawnBlossom()` creates `{ id, x, y: 0 }`
- `useEffect` with `setInterval(spawnBlossom, spawnMs)`
- `if (prev.blossoms.length >= maxOnScreen) return prev;`

---

### 4) Falling + hit detection (Game.jsx – 16ms tick loop)

This is your biggest “crucial code” section.

**Say (simple):**

- “Every ~16ms, I move every blossom downward.”
- “Then I check if it’s inside a catch-zone near the bottom.”
- “If it’s close enough to Suki’s X position, it counts as caught and disappears.”
- “If it falls off-screen, it becomes a miss.”

**Code anchors:**

- `tickMs = 16`
- `moved = prev.blossoms.map(...)`
- `inCatchZone` (Y-range check)
- `closeToCatcher` (X-distance check)
- `continue; // caught → remove immediately`
- `fellOff` → increments `misses`

---

### 5) Smooth movement (Game.jsx – keydown + movement loop)

**Say:** “Instead of moving once per keypress, I track direction on keydown/keyup using a ref, then run a small movement loop. That creates continuous, smooth movement while the key is held.”

**Code anchors:**

- `dirRef.current = -1 / 1` in `keydown`
- `dirRef.current = 0` in `keyup`
- movement loop: `setInterval(..., 33)` that updates `catcherX`

**Extra point (good):**  
`catcherXRef` exists so the collision loop always reads the latest position without timing issues.

---

### 6) End states + overlay UI (Game.jsx)

**Say:** “When the game isn’t running, I show an overlay that changes based on whether you haven’t started, paused, or game over.”

**Code anchors:**

- `isGameOver`, `hasStarted`
- overlay conditional render

---

## What to send next (for demo polish)

Post **`main.jsx` (or `index.jsx`)** next, and if you have it, your **`vite.config`** isn’t needed—but your **public assets list** is (image filenames) so the README can mention them cleanly.
