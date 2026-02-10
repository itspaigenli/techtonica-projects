// client/src/App.js
import { useState } from "react";
import Header from "./components/header.js";
import UserForm from "./components/user.js";
import Game from "./components/game.js";
import GameSetupForm from "./components/gamesetupform.js"; // make sure this path/name matches your file
import "./App.css";

function App() {
  const [user, setUser] = useState("");

  // Game setup settings (defaults)
  const [settings, setSettings] = useState({
    amount: 20,
    type: "",        // "" = any
    difficulty: "",  // "" = any
    category: "17",  // Science & Nature
  });

  const handleUser = (text) => {
    setUser(text);
  };

  return (
    <div className="App">
      <div className="top-glass">
        <Header user={user} />

        {/* Game Setup Form (separate component) */}
        <GameSetupForm settings={settings} onChange={setSettings} />

        {/* Name input form */}
        <UserForm grabUser={handleUser} />
      </div>

      {/* If you still want "name first", keep this conditional */}
      {user ? <Game settings={settings} /> : null}

      {/* If you want questions to show immediately instead, use this:
          <Game settings={settings} />
      */}
    </div>
  );
}

export default App;
