import { deleteContact } from "../api";

function ViewContact({ contact, onBack, onDelete }) {
  if (!contact) {
    return <p>No contact selected.</p>;
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?",
    );

    if (!confirmDelete) return;

    try {
      await deleteContact(contact.id);

      if (onDelete) {
        onDelete(contact.id);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete contact.");
    }
  }

  return (
    <section>
      <div className="contact-profile">
        <img
          src={contact.temporal_id_picture || "/agents/agent-a1.png"}
          alt={contact.temporal_id}
          className="agent-photo"
        />

        <div>
          <h2>{contact.temporal_id}</h2>
          <p>Temporal Contact: {contact.temporal_contact}</p>
          <p>Status: {contact.status || "No status available."}</p>
        </div>
      </div>

      <p>Current Timeline: {contact.current_timeline}</p>
      <p>Origin Timeline: {contact.origin_timeline}</p>
      <p>
        Mission Notes: {contact.mission_notes || "No mission notes available."}
      </p>

      <button type="button" onClick={onBack}>
        Back
      </button>

      <button type="button" className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </section>
  );
}

export default ViewContact;
