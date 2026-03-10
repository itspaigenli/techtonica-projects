import "./App.css";
import SightingsList from "./components/SightingsList";
import SpeciesList from "./components/SpeciesList";

function App() {
  return (
    <main>
      <h1>FaunaDex</h1>
      <p>Animal Sighting Tracker</p>

      <SightingsList />
      <SpeciesList />
    </main>
  );
}

export default App;
