import { useState } from "react";
import "./App.css";
import Game from "./assets/components/Game";

export default function App() {
  const [playerName, setPlayerName] = useState("Player");

  return (
    <div className="app">
      <h1>Suki’s Sakura Catch!</h1>
      <Game playerName={playerName} onChangePlayerName={setPlayerName} />
    </div>
  );
}
