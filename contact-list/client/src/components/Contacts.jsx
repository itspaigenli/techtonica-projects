function Contacts({ items }) {
  if (!items || items.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <ul>
      {items.map((contact) => (
        <li key={contact.id}>
          {contact.temporal_id} - {contact.temporal_contact}
        </li>
      ))}
    </ul>
  );
}

export default Contacts;
