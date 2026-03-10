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
          <main>
            <h1>FaunaDex</h1>
            <p>Animal Sighting Tracker</p>

            <SightingsForm onSightingAdded={handleDataChange} />
            <IndividualsForm onIndividualAdded={handleDataChange} />

            <SightingsList refreshKey={refreshKey} />
            <IndividualsList refreshKey={refreshKey} />
            <SpeciesList />
          </main>
        }
      />

      <Route path="/individuals/:id" element={<IndividualDetail />} />
    </Routes>
  );
}

export default App;
