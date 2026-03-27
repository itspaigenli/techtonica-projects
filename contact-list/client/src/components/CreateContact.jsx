import { useState } from "react";
import { createContact } from "../api";

function CreateContact({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    temporal_id: "",
    temporal_contact: "",
    current_timeline: "",
    origin_timeline: "",
    mission_notes: "",
    status: "",
    temporal_id_picture: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !formData.temporal_id.trim() ||
      !formData.temporal_contact.trim() ||
      formData.current_timeline === "" ||
      formData.origin_timeline === ""
    ) {
      setError("Required fields are missing.");
      return;
    }

    try {
      const newContact = await createContact({
        ...formData,
        current_timeline: Number(formData.current_timeline),
        origin_timeline: Number(formData.origin_timeline),
        mission_notes: formData.mission_notes.trim() || null,
        status: formData.status || null,
        temporal_id_picture: formData.temporal_id_picture.trim() || null,
      });

      setFormData({
        temporal_id: "",
        temporal_contact: "",
        current_timeline: "",
        origin_timeline: "",
        mission_notes: "",
        status: "",
        temporal_id_picture: "",
      });

      if (onSuccess) {
        onSuccess(newContact);
      }
    } catch (err) {
      console.error(err);
      setError("Could not create contact.");
    }
  }

  return (
    <section>
      <h2>Create Contact</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="temporal_id">Temporal ID</label>
          <input
            id="temporal_id"
            name="temporal_id"
            type="text"
            value={formData.temporal_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="temporal_contact">Temporal Contact</label>
          <input
            id="temporal_contact"
            name="temporal_contact"
            type="text"
            value={formData.temporal_contact}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="current_timeline">Current Timeline</label>
          <input
            id="current_timeline"
            name="current_timeline"
            type="number"
            value={formData.current_timeline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="origin_timeline">Origin Timeline</label>
          <input
            id="origin_timeline"
            name="origin_timeline"
            type="number"
            value={formData.origin_timeline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="mission_notes">Mission Notes</label>
          <textarea
            id="mission_notes"
            name="mission_notes"
            value={formData.mission_notes}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Missing">Missing</option>
            <option value="Under Observation">Under Observation</option>
            <option value="Archived">Archived</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label htmlFor="temporal_id_picture">Temporal ID Picture URL</label>
          <input
            id="temporal_id_picture"
            name="temporal_id_picture"
            type="text"
            value={formData.temporal_id_picture}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Contact</button>

        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}

        {error && <p>{error}</p>}
      </form>
    </section>
  );
}

export default CreateContact;
