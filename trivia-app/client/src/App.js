import Header from './components/header.js';
import UserForm from './components/user.js';
import Game from './components/game.js';
import './App.css';
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const handleUser = (text) =>{
    setUser(text);
  }

 return (
  <div className="App">
    <div className="top-glass">
      <Header user={user} />
      <UserForm grabUser={handleUser} />
    </div>

    <Game />
  </div>
);


}

export default App;
