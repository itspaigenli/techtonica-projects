import { useEffect, useState } from "react";
import { getIndividualById } from "../api/individualsApi.js";

function IndividualModal({ individualId, onClose }) {
  const [individual, setIndividual] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadIndividual() {
      try {
        const data = await getIndividualById(individualId);
        setIndividual(data);
      } catch (err) {
        console.error(err);
        setError("Could not load individual details.");
      }
    }

    if (individualId) {
      loadIndividual();
    }
  }, [individualId]);

  if (!individualId) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {error && <p>{error}</p>}

        {!error && !individual && <p>Loading...</p>}

        {individual && (
          <>
            <h2>{individual.nickname}</h2>

            <p>
              <strong>Species:</strong> {individual.common_name}
            </p>
            <p>
              <strong>Scientific Name:</strong> {individual.scientific_name}
            </p>
            <p>
              <strong>Scientist Tracking:</strong>{" "}
              {individual.scientist_tracking}
            </p>
            <p>
              <strong>Total Sightings:</strong> {individual.sighting_count}
            </p>
            <p>
              <strong>First Sighting:</strong>{" "}
              {individual.first_sighting
                ? new Date(individual.first_sighting).toLocaleString()
                : "No sightings yet"}
            </p>
            <p>
              <strong>Most Recent Sighting:</strong>{" "}
              {individual.most_recent_sighting
                ? new Date(individual.most_recent_sighting).toLocaleString()
                : "No sightings yet"}
            </p>

            {individual.photo_url && (
              <img
                src={individual.photo_url}
                alt={individual.nickname}
                className="detail-photo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {individual.wikipedia_url && (
              <p>
                <a
                  href={individual.wikipedia_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Wikipedia Page
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default IndividualModal;
