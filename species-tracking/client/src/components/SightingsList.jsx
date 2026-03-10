import { useEffect, useState } from "react";
import { getSightings } from "../api/sightingsApi.js";

function SightingsList({ refreshKey }) {
  const [sightings, setSightings] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSightings() {
      try {
        const data = await getSightings(startDate, endDate);
        setSightings(data);
      } catch (err) {
        console.error(err);
        setError("Could not load sightings");
      }
    }

    loadSightings();
  }, [refreshKey, startDate, endDate]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Sightings</h2>

      <div className="filter-card">
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {sightings.length === 0 && <p>No sightings found.</p>}

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
