import { useEffect, useState } from "react";
import { getSightings } from "../api/sightingsApi.js";

function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSightings() {
      try {
        const data = await getSightings();
        setSightings(data);
      } catch (err) {
        setError("Could not load sightings");
        console.error(err);
      }
    }

    loadSightings();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Sightings</h2>

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
