import { useEffect, useState } from "react";
import { deleteSighting, getSightings } from "../api/sightingsApi.js";

function SightingsList({ refreshKey }) {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function loadSightings(start = startDate, end = endDate) {
    try {
      const data = await getSightings(start, end);
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

  async function handleDeleteSighting(id) {
    try {
      await deleteSighting(id);
      loadSightings();
    } catch (err) {
      console.error(err);
      setError("Could not delete sighting");
    }
  }

  function handleClearFilter() {
    setStartDate("");
    setEndDate("");
    loadSightings("", "");
  }

  return (
    <section>
      <h2>Sightings</h2>

      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button type="button" onClick={() => loadSightings()}>
            Apply
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        </div>
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

          <button
            type="button"
            className="delete-button"
            onClick={() => handleDeleteSighting(sighting.sighting_id)}
          >
            Delete Sighting
          </button>
        </div>
      ))}
    </section>
  );
}

export default SightingsList;
