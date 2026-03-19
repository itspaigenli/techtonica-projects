import { useState } from "react";
import "./App.css";
import Game from "./assets/components/Game";

export default function App() {
  const [playerName, setPlayerName] = useState("Player");
  const [difficulty, setDifficulty] = useState("normal");

  return (
    <div className="app appKawaii">
      <div className="petalLayer" aria-hidden="true" />

      <div className="topBar">
        <img
          className="logoTitle"
          src="/titlebanner.png"
          alt="Suki’s Sakura Catch!"
        />
      </div>

      <Game
        playerName={playerName}
        onChangePlayerName={setPlayerName}
        difficulty={difficulty}
        onChangeDifficulty={setDifficulty}
      />
    </div>
  );
}
