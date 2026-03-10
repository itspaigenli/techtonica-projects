import { useEffect, useState } from "react";
import { getSpecies } from "../api/speciesApi.js";

function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSpecies() {
      try {
        const data = await getSpecies();
        setSpecies(data);
      } catch (err) {
        setError("Could not load species");
        console.error(err);
      }
    }

    loadSpecies();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Species</h2>

      {species.map((animal) => (
        <div key={animal.id} className="species-card">
          <p>
            <strong>Common Name:</strong> {animal.common_name}
          </p>
          <p>
            <strong>Scientific Name:</strong> {animal.scientific_name}
          </p>
          <p>
            <strong>Population:</strong> {animal.estimated_population}
          </p>
          <p>
            <strong>Status:</strong> {animal.conservation_status}
          </p>
        </div>
      ))}
    </section>
  );
}

export default SpeciesList;
