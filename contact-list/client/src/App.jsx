// Use when components fetch their own data

import { useState } from "react";
import "./App.css";

import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleDataChange() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Project Title</h1>
      </header>

      <section className="top-row">
        <Form onSuccess={handleDataChange} />
      </section>

      <section className="content">
        <List refreshKey={refreshKey} />
      </section>
    </main>
  );
}

export default App;
