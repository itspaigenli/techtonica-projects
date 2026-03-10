import { useState } from "react";
import "./App.css";
import SightingsList from "./components/SightingsList";
import SpeciesList from "./components/SpeciesList";
import IndividualsList from "./components/IndividualsList";
import SightingsForm from "./components/SightingsForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSightingAdded() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <main>
      <h1>FaunaDex</h1>
      <p>Animal Sighting Tracker</p>

      <SightingsForm onSightingAdded={handleSightingAdded} />
      <SightingsList refreshKey={refreshKey} />
      <SpeciesList />
      <IndividualsList />
    </main>
  );
}

export default App;
