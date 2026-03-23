function Contacts({ items, onSelect, onEdit }) {
  if (!items || items.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <ul>
      {items.map((contact) => (
        <li key={contact.id}>
          <span>
            {contact.temporal_id} - {contact.temporal_contact}
          </span>

          <button type="button" onClick={() => onSelect(contact)}>
            View
          </button>

          <button type="button" onClick={() => onEdit(contact)}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Contacts;
