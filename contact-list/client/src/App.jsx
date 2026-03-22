import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItems() {
      try {
        // fetch items here
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      }
    }

    loadItems();
  }, []);

  function handleSelectItem(item) {
    setSelectedItem(item);
    setCurrentView("view");
  }

  function handleShowCreate() {
    setCurrentView("create");
  }

  function handleBackToList() {
    setSelectedItem(null);
    setCurrentView("list");
  }

  function handleCreateSuccess(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
    setCurrentView("list");
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>App Title</h1>
      </header>

      {error && <p>{error}</p>}

      {currentView === "list" && (
        <>
          <button onClick={handleShowCreate}>Add New</button>
          {/* List component here */}
        </>
      )}

      {currentView === "create" && <>{/* Form component here */}</>}

      {currentView === "view" && <>{/* View component here */}</>}
    </main>
  );
}

export default App;
