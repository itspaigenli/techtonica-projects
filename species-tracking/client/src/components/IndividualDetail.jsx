import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getIndividualById } from "../api/individualsApi.js";

function IndividualDetail() {
  const { id } = useParams();
  const [individual, setIndividual] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadIndividual() {
      try {
        const data = await getIndividualById(id);
        setIndividual(data);
      } catch (err) {
        console.error(err);
        setError("Could not load individual details.");
      }
    }

    loadIndividual();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!individual) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>{individual.nickname}</h1>

      <p>
        <strong>Species:</strong> {individual.common_name}
      </p>
      <p>
        <strong>Scientific Name:</strong> {individual.scientific_name}
      </p>
      <p>
        <strong>Scientist Tracking:</strong> {individual.scientist_tracking}
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
          <a href={individual.wikipedia_url} target="_blank" rel="noreferrer">
            View Wikipedia Page
          </a>
        </p>
      )}

      <p>
        <Link to="/">Back to FaunaDex</Link>
      </p>
    </main>
  );
}

export default IndividualDetail;
