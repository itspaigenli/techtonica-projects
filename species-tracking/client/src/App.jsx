import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SightingsList from "./components/SightingsList";
import SpeciesList from "./components/SpeciesList";
import IndividualsList from "./components/IndividualsList";
import SightingsForm from "./components/SightingsForm";
import IndividualsForm from "./components/IndividualsForm";
import IndividualDetail from "./components/IndividualDetail";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleDataChange() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="app-shell">
            <header className="app-header">
              <h1>FaunaDex</h1>
              <p>Animal Sighting Tracker</p>
            </header>

            <section className="top-row">
              <div className="panel">
                <SightingsForm onSightingAdded={handleDataChange} />
              </div>

              <div className="panel">
                <IndividualsForm onIndividualAdded={handleDataChange} />
              </div>
            </section>

            <section className="content-grid">
              <div className="panel">
                <SightingsList refreshKey={refreshKey} />
              </div>

              <div className="panel">
                <IndividualsList refreshKey={refreshKey} />
              </div>

              <div className="panel panel-full">
                <SpeciesList />
              </div>
            </section>
          </main>
        }
      />

      <Route path="/individuals/:id" element={<IndividualDetail />} />
    </Routes>
  );
}

export default App;
