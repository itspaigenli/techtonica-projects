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
    <main>
      <h1>FaunaDex</h1>
      <p>Animal Sighting Tracker</p>

      <SightingsForm onSightingAdded={handleDataChange} />
      <IndividualsForm onIndividualAdded={handleDataChange} />

      <SightingsList refreshKey={refreshKey} />
      <IndividualsList />
      <SpeciesList />
    </main>
  );
}

export default App;
