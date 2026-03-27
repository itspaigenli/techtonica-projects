import { useEffect, useState } from "react";
import { getContacts } from "./api";

import Contacts from "./components/Contacts";
import CreateContact from "./components/CreateContact";
import ViewContact from "./components/ViewContact";
import EditContact from "./components/EditContact";

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

  function handleEditContact(contact) {
    setSelectedContact(contact);
    setCurrentView("edit");
  }

  function handleBackToList() {
    setSelectedContact(null);
    setCurrentView("list");
  }

  function handleCreateSuccess(newContact) {
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setCurrentView("list");
  }

  function handleEditSuccess(updatedContact) {
    setContacts((prevContacts) =>
      prevContacts.map((c) => {
        if (c.id === updatedContact.id) {
          return updatedContact;
        } else {
          return c;
        }
      }),
    );

    setCurrentView("list");
    setSelectedContact(null);
  }

  function handleDeleteContact(id) {
    setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
    setSelectedContact(null);
    setCurrentView("list");
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>ChronoRegistry</h1>
        <p>Temporal Records Bureau</p>
      </header>

      {error && <p>{error}</p>}

      {currentView === "list" && (
        <>
          <button type="button" onClick={handleShowCreate}>
            Add Contact
          </button>

          <Contacts
            items={contacts}
            onSelect={handleSelectContact}
            onEdit={handleEditContact}
          />
        </>
      )}

      {currentView === "create" && (
        <CreateContact
          onSuccess={handleCreateSuccess}
          onCancel={handleBackToList}
        />
      )}

      {currentView === "view" && (
        <ViewContact
          contact={selectedContact}
          onBack={handleBackToList}
          onDelete={handleDeleteContact}
        />
      )}

      {currentView === "edit" && (
        <EditContact
          contact={selectedContact}
          onSuccess={handleEditSuccess}
          onCancel={handleBackToList}
        />
      )}
    </main>
  );
}

export default App;
