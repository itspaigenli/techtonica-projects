import { useEffect, useState } from "react";
import { getContacts } from "./api";

import Contacts from "./components/Contacts";
import CreateContact from "./components/CreateContact";
import ViewContact from "./components/ViewContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContacts() {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load contacts.");
      }
    }

    loadContacts();
  }, []);

  function handleSelectContact(contact) {
    setSelectedContact(contact);
    setCurrentView("view");
  }

  function handleShowCreate() {
    setCurrentView("create");
  }

  function handleBackToList() {
    setSelectedContact(null);
    setCurrentView("list");
  }

  function handleCreateSuccess(newContact) {
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setCurrentView("list");
  }

  return (
    <main>
      <header>
        <h1>ChronoRegistry</h1>
      </header>

      {error && <p>{error}</p>}

      {currentView === "list" && (
        <>
          <button type="button" onClick={handleShowCreate}>
            Add Contact
          </button>

          <Contacts items={contacts} onSelect={handleSelectContact} />
        </>
      )}

      {currentView === "create" && (
        <CreateContact
          onSuccess={handleCreateSuccess}
          onCancel={handleBackToList}
        />
      )}

      {currentView === "view" && (
        <ViewContact contact={selectedContact} onBack={handleBackToList} />
      )}
    </main>
  );
}

export default App;
