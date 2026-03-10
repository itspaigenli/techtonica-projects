import { useEffect, useState } from "react";
import { deleteIndividual, getIndividuals } from "../api/individualsApi.js";
import IndividualModal from "./IndividualModal.jsx";

function IndividualsList({ refreshKey }) {
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIndividualId, setSelectedIndividualId] = useState(null);

  useEffect(() => {
    async function loadIndividuals() {
      try {
        const data = await getIndividuals();
        setIndividuals(data);
      } catch (err) {
        setError("Could not load individuals");
        console.error(err);
      }
    }

    loadIndividuals();
  }, [refreshKey]);

  function toggleExpanded(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  async function handleDeleteIndividual(id) {
    try {
      await deleteIndividual(id);
      setIndividuals((prev) =>
        prev.filter((individual) => individual.id !== id),
      );

      if (expandedId === id) {
        setExpandedId(null);
      }

      if (selectedIndividualId === id) {
        setSelectedIndividualId(null);
      }

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not delete individual");
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Individuals</h2>

      {individuals.map((individual) => {
        const isExpanded = expandedId === individual.id;

        return (
          <div key={individual.id} className="individual-accordion-card">
            <button
              type="button"
              className="individual-summary-button"
              onClick={() => toggleExpanded(individual.id)}
            >
              <div className="individual-summary-top">
                <p className="individual-name">{individual.nickname}</p>
                <p className="individual-species">{individual.common_name}</p>
              </div>

              <div className="individual-summary-meta">
                <span>{isExpanded ? "−" : "+"}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="individual-expanded-content">
                <p>
                  <strong>Sighting Count:</strong> {individual.sighting_count}
                </p>
                <p>
                  <strong>Scientist:</strong> {individual.scientist_tracking}
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

                <div className="individual-action-row">
                  <button
                    type="button"
                    className="details-button"
                    onClick={() => setSelectedIndividualId(individual.id)}
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDeleteIndividual(individual.id)}
                  >
                    Delete Individual
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {selectedIndividualId && (
        <IndividualModal
          individualId={selectedIndividualId}
          onClose={() => setSelectedIndividualId(null)}
        />
      )}
    </section>
  );
}

export default IndividualsList;
