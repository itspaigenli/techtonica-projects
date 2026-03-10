import { useEffect, useState } from "react";
import { getIndividuals } from "../api/individualsApi.js";

function IndividualsList() {
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Individuals</h2>

      {individuals.map((individual) => (
        <div key={individual.id} className="individual-card">
          <p>
            <strong>Nickname:</strong> {individual.nickname}
          </p>
          <p>
            <strong>Species:</strong> {individual.common_name}
          </p>
          <p>
            <strong>Scientist:</strong> {individual.scientist_tracking}
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
        </div>
      ))}
    </section>
  );
}

export default IndividualsList;
