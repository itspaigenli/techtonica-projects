import { useEffect, useState } from "react";
import { getSightings } from "../api/sightingsApi.js";

function SightingsList({ refreshKey }) {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function loadSightings() {
    try {
      const data = await getSightings(startDate, endDate);
      setSightings(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not load sightings");
    }
  }

  useEffect(() => {
    loadSightings();
  }, [refreshKey]);

  return (
    <section>
      <h2>Sightings</h2>

      <div className="filter-card">
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type="button" onClick={loadSightings}>
          Apply Filter
        </button>
      </div>

      {error && <p>{error}</p>}

      {!error && sightings.length === 0 && <p>No sightings found.</p>}

      {sightings.map((sighting) => (
        <div key={sighting.sighting_id} className="sighting-card">
          <p>
            <strong>Animal:</strong> {sighting.nickname}
          </p>
          <p>
            <strong>Species:</strong> {sighting.common_name}
          </p>
          <p>
            <strong>Location:</strong> {sighting.location}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(sighting.sighting_datetime).toLocaleString()}
          </p>
        </div>
      ))}
    </section>
  );
}

export default SightingsList;
