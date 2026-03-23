function ViewContact({ contact, onBack }) {
  if (!contact) {
    return <p>No contact selected.</p>;
  }

  return (
    <section>
      <h2>{contact.temporal_id}</h2>

      <p>Temporal Contact: {contact.temporal_contact}</p>
      <p>Current Timeline: {contact.current_timeline}</p>
      <p>Origin Timeline: {contact.origin_timeline}</p>
      <p>
        Mission Notes: {contact.mission_notes || "No mission notes available."}
      </p>
      <p>Status: {contact.status || "No status available."}</p>

      <button type="button" onClick={onBack}>
        Back
      </button>
    </section>
  );
}

export default ViewContact;
