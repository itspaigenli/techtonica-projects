import { useState } from "react";
import Game from "./components/Game";
import "./App.css";

export default function App() {
  // Input state (comes from Controls via callback)
  const [playerName, setPlayerName] = useState("Player");
  const [difficulty, setDifficulty] = useState("normal"); // easy | normal | hard

  return (
    <div className="app">
      <h1>Suki’s Sakura Catch! 🌸🐾</h1>

      <Game
        playerName={playerName}
        difficulty={difficulty}
        onChangePlayerName={setPlayerName}
        onChangeDifficulty={setDifficulty}
      />
    </div>
  );
}
