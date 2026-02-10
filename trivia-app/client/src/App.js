import { useState } from "react";
import Header from "./components/header.js";
import UserForm from "./components/user.js";
import Game from "./components/game.js";
import GameSetupForm from "./components/gamesetupform.js";
import "./App.css";

function App() {
  const [user, setUser] = useState("");

  const [settings, setSettings] = useState({
    amount: "10",
    type: "",
    difficulty: "",
    category: "",
  });

  const handleUser = (text) => {
    setUser(text);
  };

  return (
    <div className="App">
      <div className="top-glass">
        <Header user={user} />
        <GameSetupForm settings={settings} onChange={setSettings} />
        <UserForm grabUser={handleUser} />
      </div>

      <Game settings={settings} />
    </div>
  );
}

export default App;
