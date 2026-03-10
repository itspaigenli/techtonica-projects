import { useEffect, useState } from "react";
import { createSighting } from "../api/sightingsApi.js";
import { getIndividuals } from "../api/individualsApi.js";

function SightingsForm({ onSightingAdded, refreshKey }) {
  const [sightingDatetime, setSightingDatetime] = useState("");
  const [individualId, setIndividualId] = useState("");
  const [location, setLocation] = useState("");
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadIndividuals() {
      try {
        const data = await getIndividuals();
        setIndividuals(data);
      } catch (err) {
        console.error(err);
        setError("Could not load individuals.");
      }
    }

    loadIndividuals();
  }, [refreshKey]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await createSighting({
        sighting_datetime: sightingDatetime,
        individual_id: Number(individualId),
        location,
      });

      setSightingDatetime("");
      setIndividualId("");
      setLocation("");

      if (onSightingAdded) {
        onSightingAdded();
      }
    } catch (err) {
      console.error(err);
      setError("Could not create sighting.");
    }
  }

  return (
    <section>
      <h2>Add Sighting</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <label htmlFor="sighting-datetime">Date and Time</label>
        <input
          id="sighting-datetime"
          type="datetime-local"
          value={sightingDatetime}
          onChange={(event) => setSightingDatetime(event.target.value)}
          required
        />

        <label htmlFor="individual">Individual</label>
        <select
          id="individual"
          value={individualId}
          onChange={(event) => setIndividualId(event.target.value)}
          required
        >
          <option value="">Select an individual</option>
          {individuals.map((individual) => (
            <option key={individual.id} value={individual.id}>
              {individual.nickname} ({individual.common_name})
            </option>
          ))}
        </select>

        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />

        <button type="submit">Add Sighting</button>

        {error && <p>{error}</p>}
      </form>
    </section>
  );
}

export default SightingsForm;
