import { useEffect, useState } from "react";
import { getContacts } from "./api";

import Contacts from "./components/Contacts";

function App() {
  const [contacts, setContacts] = useState([]);
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

  return (
    <main>
      <header>
        <h1>ChronoRegistry</h1>
      </header>

      {error && <p>{error}</p>}

      <Contacts items={contacts} />
    </main>
  );
}

export default App;
