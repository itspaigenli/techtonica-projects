import { useState } from "react";
import "./App.css";
import SightingsList from "./components/SightingsList";
import SpeciesList from "./components/SpeciesList";
import IndividualsList from "./components/IndividualsList";
import SightingsForm from "./components/SightingsForm";
import IndividualsForm from "./components/IndividualsForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleDataChange() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>FaunaDex</h1>
        <p>Animal Sighting Tracker</p>
      </header>

      <section className="top-row top-row-three">
        <div className="panel">
          <SightingsForm onSightingAdded={handleDataChange} />
        </div>

        <div className="panel">
          <IndividualsForm onIndividualAdded={handleDataChange} />
        </div>

        <div className="panel">
          <SpeciesList />
        </div>
      </section>

      <section className="content-grid content-grid-two">
        <div className="panel">
          <SightingsList refreshKey={refreshKey} />
        </div>

        <div className="panel">
          <IndividualsList refreshKey={refreshKey} />
        </div>
      </section>
    </main>
  );
}

export default App;
