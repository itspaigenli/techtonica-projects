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
          <div className="contact-actions">
            <button type="button" onClick={() => onSelect(contact)}>
              View
            </button>

            <button type="button" onClick={() => onEdit(contact)}>
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Contacts;
