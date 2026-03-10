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
        console.error(err);
        setError("Could not load species");
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

      <div className="species-compact-list">
        {species.map((animal) => (
          <div key={animal.id} className="species-compact-card">
            <p className="species-name">{animal.common_name}</p>
            <p className="species-scientific">{animal.scientific_name}</p>
            <div className="species-meta">
              <span>{animal.conservation_status}</span>
              <span>{animal.estimated_population}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SpeciesList;
