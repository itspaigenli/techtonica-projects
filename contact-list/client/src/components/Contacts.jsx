function Contacts({ items, onSelect }) {
  if (!items || items.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <ul>
      {items.map((contact) => (
        <li key={contact.id}>
          <button type="button" onClick={() => onSelect(contact)}>
            {contact.temporal_id} - {contact.temporal_contact}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Contacts;
